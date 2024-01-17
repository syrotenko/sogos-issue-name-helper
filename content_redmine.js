if (typeof browser === "undefined") {
    browser = chrome;
}

function processGetIssueInfo() {
    try {
        var typeAndId = document.querySelector('#content > h2').textContent.split('#');
        var name = document.querySelector('div.subject > div > h3').textContent;
        return {
            format: 'itn',
            type: typeAndId[0].trim(),
            id: `${typeAndId[1].trim()}`,
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
