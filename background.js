chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        if (request.contentScriptQuery === "bucket") {
            function timeout(ms, promise) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        reject(new Error("timeout"))
                    }, ms)
                    promise.then(resolve, reject)
                })
            }

            timeout(3000, fetch("https://ni-xbox.naturalint.com/api/bucket-bos/ui-data/pages/"))
                .then(response => sendResponse(response.json()))
                .catch(error => sendResponse(error))
            return true
        }
    });