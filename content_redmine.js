function processGetIssueInfo() {
    try {
        var typeAndId = document.querySelector('#content > h2').textContent.split('#');
        var name = document.querySelector('div.subject > div > h3').textContent;
        return Promise.resolve({
            format: 'itn',
            type: typeAndId[0].trim(),
            id: `${typeAndId[1].trim()}`,
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
