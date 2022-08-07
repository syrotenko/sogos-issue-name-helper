function processGetIssueInfo() {
    try {
        var nameAndIdElems = document.querySelectorAll('.gh-header-title > span');
        var name = nameAndIdElems[0].textContent;
        var id = nameAndIdElems[1].textContent;
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
