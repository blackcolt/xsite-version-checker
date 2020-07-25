chrome.runtime.onMessage.addListener(
    (request, _, callback) => {
        if (request.contentScriptQuery === "bucket") {
            function timeout(ms, promise) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject(new Error("timeout"));
                    }, ms);
                    promise.then(resolve, reject);
                });
            }

            timeout(10000, fetch("https://ni-xbox.naturalint.com/api/bucket-bos/ui-data/pages/"))
                .then(response => response.json())
                .then(data => callback(data))
                .catch(error => callback(error));
            return true;
        }
    });