// Chrome Extension's Service Worker
// Handles some properties regarding the extension which can't be handled in scripts

let received_summary:string|undefined = undefined

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
        void chrome.action.setPopup({popup: "popup.html"});
        received_summary = request.response // stores the summary in variable "received_summary"
        void chrome.tabs.create({url: "HTML/summaryPage.html"})
    }

    // sends the stored summary to the requester.
    if(request.message === "fetch_summary"){
        sendResponse({"summary":received_summary})
    }

    // Changes the popup HTML to a loading HTML.
    if(request.message === "setLoading"){
        void chrome.action.setPopup({popup: "HTML/Loading.html"});
    }

    if(request.message === "setDefault"){
        void chrome.action.setPopup({popup: "popup"});
    }

})
