chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        if (request.contentScriptQuery === "bucket") {
            // $.get('https://ni-xbox.naturalint.com/api/bucket-bos/ui-data/pages/', function (data) {
            //     sendResponse(data);
            // });
            var url = "https://ni-xbox.naturalint.com/api/bucket-bos/ui-data/pages/"
            fetch(url)
                .then(response => response.text())
                .then(text => text)
                .then(buckets => sendResponse(buckets));
            return true;
        }
    });