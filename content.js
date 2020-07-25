$(function () {
    let body = $('body'), bucketName = body.attr('data-name'), bucketVersion = body.attr('data-version');
    if (bucketName && bucketVersion) {
        $.get(chrome.extension.getURL('/snack.html'), (htmlData) => {
            $(htmlData).appendTo(body);
            getLatestVersion();
        });
    }

    function createVersionText(text, latestVersion) {
        text = text.replace('{version}', bucketVersion).replace('{bucket-name}', bucketName);
        if (latestVersion) {
            return bucketVersion.trim().toLowerCase() === latestVersion.trim().toLowerCase() ?
                text.replace('updated version: {new-version}', '<b id="success"> BUCKET IN LATEST VERSION :)</b>') :
                text.replace('{new-version}', `<b id="error">${latestVersion}</b>`);
        }
        return text.replace(' updated version: {new-version}', '<b id="error"> Can\'t get new version :( </b>');
    }

    function getLatestVersion() {
        chrome.runtime.sendMessage(
            {contentScriptQuery: "bucket"}, (response) => {
                const snack = $('#snackbar');
                snack.html(createVersionText(snack.text(), response.content && response.content[bucketName] ? response.content[bucketName][0] : false))
                    .addClass('show');
                setTimeout(() => {
                    snack.removeClass('show');
                }, 15000);
            })
    }
});