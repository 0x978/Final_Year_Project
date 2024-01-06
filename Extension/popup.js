document.addEventListener('DOMContentLoaded', function() {
    let privacyPolicyButton = document.getElementById('privacyPolicyButton');

    // Add listener to button
    privacyPolicyButton.addEventListener('click', async function () {
        let tab = await getCurrentUserTab()
        setButtonState(privacyPolicyButton,"loading...")
        chrome.tabs.sendMessage(tab.id, {"message": "summarize_terms"});
    });
});

// Gets current active user tab.
async function getCurrentUserTab(){
    let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    return tab;
}

// Set the text of a given button element in the popup.html UI.
// State is to be an object with keys "Text" and "Active".
function setButtonState(button,state){
    console.log(button.innerText)
    button.innerText = state
}
