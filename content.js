$(function () {
    var body = $('body'), bucketName = body.attr('data-name'), bucketVersion = body.attr('data-version');
    if (bucketName && bucketVersion) {
        $.get(chrome.extension.getURL('/snack.html'), function (data) {
            $(data).appendTo('body');
            getLatestVersion();
        });
    }

    function createVersionText(text, latestVersion) {
        return text.replace('{version}', bucketVersion)
            .replace('{bucket-name}', bucketName)
            .replace('{new-version}', latestVersion);
    }

    function getLatestVersion() {
        chrome.runtime.sendMessage(
            {contentScriptQuery: "bucket"}, function (response) {
                response = JSON.parse(response);
                var snack = $('#snackbar');
                snack.text(createVersionText(snack.text(), response.content[bucketName][0]));
                snack.addClass('show');
                setTimeout(function () {
                    snack.removeClass('show');
                }, 5000);
            })
    }
});