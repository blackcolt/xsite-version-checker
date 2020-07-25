$(function () {
    var body = $('body'), bucketName = body.attr('data-name'), bucketVersion = body.attr('data-version');
    if (bucketName && bucketVersion) {
        $.get(chrome.extension.getURL('/snack.html'), function (data) {
            $(data).appendTo('body');
            var snack = $('#snackbar');
            snack.text(createVersionText(snack.text()));
            snack.addClass('show');
            setTimeout(function () {
                snack.removeClass('show');
            }, 5000);
        });
    }

    function createVersionText(text) {
        return text.replace('{version}', bucketVersion).replace('{bucket-name}', bucketName);
    }
})