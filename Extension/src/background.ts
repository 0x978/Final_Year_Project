// Chrome Extension's Service Worker
// Handles some properties regarding the extension which can't be handled in scripts

let received_summary:string|undefined = undefined
let documentLength:number|undefined = undefined

chrome.runtime.onInstalled.addListener(() => {
    void chrome.action.setBadgeText({
        text: "OFF",
    });
});

chrome.runtime.onMessage.addListener( (request,_,sendResponse) => {
    if (request.message === "on_badge") {
        void chrome.action.setBadgeText({
            text: "ON",
        })
    }
    if (request.message === "off_badge") {
        void chrome.action.setBadgeText({
            text: "OFF",
        })
    }
    if (request.message === "done_badge") {
        void chrome.action.setBadgeText({
            text: "DONE",
        })
    }

    // Opens a new tab with the "summaryPage.html" file and resets the popup html.
    if (request.message === "receive_response"){
        void chrome.action.setPopup({popup: "HTML/popup.html"});
        received_summary = request.response // stores the summary in variable "received_summary"
        void chrome.tabs.create({url: "HTML/summaryPage.html"})
    }

    // sends the stored summary to the requester.
    if(request.message === "fetch_summary"){
        sendResponse({"summary":received_summary})
    }

    // Changes the popup HTML to a loading HTML.
    // Also sends out a message with the summary length (received by loading.ts)
    if(request.message === "setLoading"){
        documentLength = request.documentLength
        void chrome.action.setPopup({popup: "HTML/Loading.html"});
        void chrome.runtime.sendMessage({"message": `send_summary_length`,"doc_length":documentLength})
    }

    // Changes popup HTML to default "popup.html"
    if(request.message === "setDefault"){
        void chrome.action.setPopup({popup: "HTML/popup.html"});
    }

    // Returns the most recently processed document's length.
    // Currently used by Loading.ts
    if(request.message === "getDocumentLength"){
        sendResponse({"docLength":documentLength})
    }
})
