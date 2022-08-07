function onError(error) {
    console.error(`Error: ${error}`);
}

function getBranchNameElem() {
    return document.getElementById("branchName");
}

function getCommitMessageElem() {
    return document.getElementById("commitMessage");
}

function copyBranchName() {
    getBranchNameElem().select();
    document.execCommand("copy");
}

function copyMessage() {
    getCommitMessageElem().select();
    document.execCommand("copy");
}

async function getActiveTabsAsync() {
    return browser.tabs.query({
        currentWindow: true,
        active: true
    }).catch(onError);
}

async function sendMessageToTabsAsync(tabs, message) {
    var responcesPending = [];
    for (let tab of tabs) {
        currentResp = browser.tabs.sendMessage(tab.id, message).catch(onError);
        responcesPending.push(currentResp);
    }
    return responcesPending;
}

function getFormattedValues(format, type, id, name) {
    var branchName = '';
    var commitMessage = '';
    switch (format) {
        case 'itn':
            branchName = `${type.toLowerCase().trim()}/${id}-${name.toLowerCase().replace(/[^\w\s-]/gi, '').replaceAll(" ", "-")}`;
            commitMessage = `#${id}: ${name}`;
            break;
        case 'gth':
            branchName = `${id.substring(1)}-${name.toLowerCase().replace(/[^\w\s-]/gi, '').replaceAll(" ", "-").trim()}`;
            commitMessage = `${id} ${name}`;
            break;
        default:
            branchName = `${id}-${name.toLowerCase().replace(/[^\w\s-]/gi, '').replaceAll(" ", "-").trim()}`;
            commitMessage = `${id} ${name}`;
            break;
    }
    return [branchName, commitMessage];
}

function fillFields(format, type, id, name) {
    document.getElementById("issueId").value = id;
    document.getElementById("issueName").value = name;
    var [branchName, commitMessage] = getFormattedValues(format, type, id, name);
    getBranchNameElem().value = branchName;
    getCommitMessageElem().value = commitMessage;
}

function fillIssueInfo() {
    var message = { type: 'get_issue_info' };
    resPending = getActiveTabsAsync()
        .then((tabs) => sendMessageToTabsAsync(tabs, message))
        .then((responces) => {
            respSingle = responces[0];
            respSingle = Array.isArray(responces) && responces.length ? responces[0] : undefined;
            if (respSingle) {
                respSingle.then((issueInfo) => {
                    if (issueInfo) {
                        fillFields(issueInfo.format, issueInfo.type, issueInfo.id, issueInfo.name);
                    }
                })
            }
        })
        .catch(onError);
}

function main() {
    fillIssueInfo();
    var copyBranchNameButton = document.getElementById("copyBranchName");
    var copyMessageButton = document.getElementById("copyMessage");
    copyBranchNameButton.addEventListener("click", copyBranchName);
    copyMessageButton.addEventListener("click", copyMessage);
}

document.addEventListener("DOMContentLoaded", main);
