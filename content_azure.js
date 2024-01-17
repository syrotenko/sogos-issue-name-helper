if (typeof browser === "undefined") {
    browser = chrome;
}

function processGetIssueInfo() {
    try {
        var id = document.querySelector('.work-item-form-id').textContent;
        var name = document.querySelector('.work-item-form-title > div > div > input').value;
        return {
            format: 'azure',
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
