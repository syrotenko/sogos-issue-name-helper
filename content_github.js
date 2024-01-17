if (typeof browser === "undefined") {
    browser = chrome;
}

function processGetIssueInfo() {
    try {
        var name = document.querySelector('.gh-header-title > bdi').textContent;
        var id = document.querySelector('.gh-header-title > span').textContent;
        return {
            format: 'gth',
            type: '',
            id: id,
            name: name
        };
    } catch (error) {
        console.error(error);
        return {err: error};
    }
}

function processRequest(request) {
    switch (request.type) {
        case 'get_issue_info':
            return processGetIssueInfo();
        default:
            var message = `Unknown request ${request.type}`
            console.log(message);
            return {err: error};
    }
}

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(processRequest(request));
});
