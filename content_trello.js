function processGetIssueInfo() {
    try {
        var nameAndIdElems = document.querySelector('.window-title').textContent;
        var id = nameAndIdElems.substring(0, nameAndIdElems.indexOf(' '));
        var name = nameAndIdElems.substring(nameAndIdElems.indexOf(' ') + 1);
        return Promise.resolve({
            format: '',
            type: '',
            id: id,
            name: name
        });
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

function processRequest(request) {
    switch (request.type) {
        case 'get_issue_info':
            return processGetIssueInfo();
        default:
            var message = `Unknown request ${request.type}`
            console.log(message);
            return Promise.reject(message);
    }
}

browser.runtime.onMessage.addListener((request) => {
    return processRequest(request);
});
