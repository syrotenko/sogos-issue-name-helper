if (typeof browser === "undefined") {
    browser = chrome;
}

function processGetIssueInfo() {
    try {
        var nameAndIdElems = document.querySelector('.window-title').textContent;
        var id = nameAndIdElems.substring(0, nameAndIdElems.indexOf(' '));
        var name = nameAndIdElems.substring(nameAndIdElems.indexOf(' ') + 1);
        return {
            format: '',
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
