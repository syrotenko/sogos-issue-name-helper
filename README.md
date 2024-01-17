# sogos-issue-name-helper

### Supported Issue Tracking Systems:
- GitHub
- Jira
- Azure DevOps
- Trello
- Redmine

![Alt text](issue-name-helper-example.jpg)

## Install
- ### Firefox
    Download and run the latest version of the installation file (`*.xpi`)
- ### Chrome
    1. Download the archive with source files (`*.zip`) and unpack it.
    2. Go to `chrome://extensions/` and click the toggle switch next to **Developer mode**.
    3. Click the **Load unpacked** button and select the unpacked extension directory.
    4. Turn off **Developer mode**.

## Development
### 1. Install Node.js 16.16.0
### 2. Install web-ext
``` bash
npm install --global web-ext
```

## (deprecated) Local testing
``` bash
web-ext run
```

## (deprecated) Build extension
``` bash
web-ext build --artifacts-dir ./artifacts --overwrite-dest
```
