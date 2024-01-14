// Chrome Extension's Service Worker
// Handles some properties regarding the extension which can't be handled in scripts

chrome.runtime.onInstalled.addListener(() => {
    void chrome.action.setBadgeText({
        text: "OFF",
    });
});

chrome.runtime.onMessage.addListener( (request) => {
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
    // Opens a new tab with the "summaryPage.html" file.
    if (request.message === "receive_response"){
        void chrome.tabs.create({url: "HTML/summaryPage.html"}).then((tab) =>{
            setTimeout(() =>{
                void chrome.tabs.sendMessage(<number>tab.id, { "message": "send_summary", "response": request.response});
            },1000)
        })
    }
})
