// Chrome makes doing anything asynchronously challenging
// as of 9 days ago it is being looked at by chrome developers
// https://bugs.chromium.org/p/chromium/issues/detail?id=1185241
// Logic in the file follows below URL for solution to above chrome issue
// https://stackoverflow.com/questions/53024819/sendresponse-not-waiting-for-async-function-or-promises-resolve

chrome.runtime.onMessage.addListener( (request,_,sendResponse) => {
    if (request.message === "summarise_terms") {
        console.log("received summary request")
        let pageContent = document.body.innerText;

        (async () => {
            const res = await receiveSummary(pageContent);
            sendResponse({"res": res})
        })();
        return true

    } else {
        console.log("Failed summary")
        sendResponse({"res": null})
        return true

    }
})

async function receiveSummary(document:String){
    const res = await fetch("http://127.0.0.1:5000/summarise",{
        method:"POST",
        body: JSON.stringify(document) //converts to a JSON string.
    })
    console.log("Received response")
    return await res.json()
}