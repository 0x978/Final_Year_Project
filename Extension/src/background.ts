// Chrome Extension's Service Worker
// Handles some properties regarding the extension which can't be handled in scripts

let received_summary:string|undefined = undefined
let classification:string|undefined = undefined
let documentLength:number|undefined = undefined
let startTime:number|undefined = undefined
let docType:string|undefined = undefined
let pageURL:string|undefined = undefined

chrome.runtime.onInstalled.addListener(() => {
    // initialise badge to off
    void chrome.action.setBadgeText({
        text: "OFF",
    });

    // Initialise to dark mode default
    void chrome.storage.sync.set({ "isDark": true})
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
        received_summary = request.summary // stores the summary in variable "received_summary"
        classification = request.classification
        docType = request.doctype
        pageURL = request.pageURL

        // if the received summary is undefined - an error occurred in summarisation - handle it.
        if(received_summary === undefined){
            // Open new tab with error screen.
            void chrome.tabs.create({url: "HTML/error.html"})
            // set current popup to error html by sending message to loading.ts saying an error occurred
            void chrome.action.setPopup({popup: "HTML/popup.html"});
        }

        else{
            void chrome.action.setPopup({popup: "HTML/popup.html"});
            void chrome.tabs.create({url: "HTML/summaryPage.html"})
        }
    }

    // sends the stored summary to the requester.
    if(request.message === "fetch_summary"){
        sendResponse({"summary":received_summary,"classification":classification, "docType":docType,
        "pageURL":pageURL})
    }

    // Changes the popup HTML to a loading HTML.
    // Also sends out a message with the summary length (received by loading.ts)
    if(request.message === "setLoading"){
        startTime = Date.now()
        documentLength = request.documentLength
        void chrome.action.setPopup({popup: "HTML/loading.html"});
        void chrome.runtime.sendMessage({"message": `send_summary_length`,"doc_length":documentLength})
        void chrome.runtime.sendMessage({"message": `send_start_time`,"time":startTime})

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

    if(request.message === "getSummaryStartTime"){
        sendResponse({"time":startTime})
    }
})
