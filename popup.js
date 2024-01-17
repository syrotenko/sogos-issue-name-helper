if (typeof browser === "undefined") {
    browser = chrome;
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
        case 'azure':
            branchName = `${id}-${name.toLowerCase().replace(/[^\w\s-]/gi, '').replaceAll(" ", "-").trim()}`;
            commitMessage = `#${id}: ${name}`;
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
    browser.tabs.query(
        {currentWindow: true, active: true}, function(tabArray) {
            browser.tabs.sendMessage(tabArray[0].id, message, function(issueInfo) {
                fillFields(issueInfo.format, issueInfo.type, issueInfo.id, issueInfo.name);
            });
        }
    );
}

function main() {
    fillIssueInfo();
    document.getElementById("copyBranchName").addEventListener("click", copyBranchName);
    document.getElementById("copyMessage").addEventListener("click", copyMessage);
}

document.addEventListener("DOMContentLoaded", main);
