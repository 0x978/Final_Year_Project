document.addEventListener('DOMContentLoaded', function() {
    let summarizeButton = document.getElementById('summarizeButton');

    // Add listener to button
    summarizeButton.addEventListener('click', async function () {
        let tab = await getCurrentUserTab()
        chrome.tabs.sendMessage(tab.id, {"message": "summarize_terms"});
    });
});

// Gets current active user tab.
async function getCurrentUserTab(){
    let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    return tab;
}