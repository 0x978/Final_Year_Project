interface buttonState {
    buttonText: string,
    isActive: boolean,
}

document.addEventListener('DOMContentLoaded', function () {
    let privacyPolicyButton = document.getElementById('privacyPolicyButton');

    if (privacyPolicyButton !== null) {

        // Add listener to button
        privacyPolicyButton.addEventListener('click', async function () {
            let tab = await getCurrentUserTab()
            setButtonState(privacyPolicyButton as HTMLElement, {buttonText: "loading...", isActive: false})
            tab?.id && await chrome.tabs.sendMessage(tab.id, {"message": "summarize_terms"});
        });

    }
});

// Gets current active user tab.
async function getCurrentUserTab() {
    let [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return tab;
}

// Set the text of a given button element in the popup.html UI.
// State is to be an object with keys "Text" and "Active".
function setButtonState(button: HTMLElement, state: buttonState) {
    button.innerText = state.buttonText
}