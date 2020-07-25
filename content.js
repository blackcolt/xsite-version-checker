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
            .replace('{bucket-name}', bucketName)
        if (latestVersion) {
            return bucketVersion === latestVersion.trim() ?
                text.replace('updated version: {new-version}', '<b>Bucket IN LATEST VERSION</b>') :
                text.replace('{new-version}', latestVersion);
        } else {
            return text.replace(' updated version: {new-version}', ' Can\'t get new version :(');
        }
    }

    function getLatestVersion() {
        chrome.runtime.sendMessage(
            {contentScriptQuery: "bucket"}, function (response) {
                const snack = $('#snackbar');
                if (response.content) {
                    response = JSON.parse(response);
                    snack.text(createVersionText(snack.text(), response.content[bucketName][0]));
                } else {
                    snack.text(createVersionText(snack.text(), false));
                }
                snack.addClass('show');
                setTimeout(function () {
                    snack.removeClass('show');
                }, 5000);
            })
    }
});