$(function () {
    var body = $('body'), bucketName = body.attr('data-name'), bucketVersion = body.attr('data-version').trim();
    if (bucketName && bucketVersion) {
        $.get(chrome.extension.getURL('/snack.html'), function (data) {
            $(data).appendTo('body');
            getLatestVersion();
        });
    }

    function createVersionText(text, latestVersion) {
        text = text.replace('{version}', bucketVersion)
            .replace('{bucket-name}', bucketName);
        if (latestVersion) {
            return bucketVersion === latestVersion.trim() ?
                text.replace('updated version: {new-version}', '<b>Bucket IN LATEST VERSION</b>') :
                text.replace('{new-version}', `<b id="error">${latestVersion}</b>`);
        }
        return text.replace(' updated version: {new-version}', '<b> Can\'t get new version :( </b>');
    }

    function getLatestVersion() {
        chrome.runtime.sendMessage(
            {contentScriptQuery: "bucket"}, function (response) {
                const snack = $('#snackbar');
                if (response.content) {
                    snack.html(createVersionText(snack.text(), response.content[bucketName][0]));
                } else {
                    snack.html(createVersionText(snack.text(), false));
                }
                snack.addClass('show');
                setTimeout(function () {
                    snack.removeClass('show');
                }, 15000);
            })
    }
});