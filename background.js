chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.contentScriptQuery === "bucket") {
            function timeout(ms, promise) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        reject(new Error("timeout"))
                    }, ms);
                    promise.then(resolve, reject)
                })
            }

            timeout(10000, fetch("https://ni-xbox.naturalint.com/api/bucket-bos/ui-data/pages/"))
                .then(response => response.json())
                .then(data => sendResponse(data))
                .catch(error => sendResponse(error));
            return true
        }
    });