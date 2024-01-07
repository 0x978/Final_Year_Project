interface buttonState {
    buttonText: string,
    isActive: boolean,
}

document.addEventListener('DOMContentLoaded', function () {
    let privacyPolicyButton = document.getElementById('privacyPolicyButton');

    if (privacyPolicyButton !== null) {
        // Add listener to button
        privacyPolicyButton.addEventListener('click', async function () {
            let tab = await getCurrentUserTab() // TODO: Why is tab sometimes undefined?

            setButtonState(privacyPolicyButton as HTMLElement, {buttonText: "loading...", isActive: false})

            const res = tab?.id && await chrome.tabs.sendMessage(tab.id, {"message": "summarise_terms"});

            console.log("response:", res) // print to console for now
        });
    }


});

// Gets current active user tab.
async function getCurrentUserTab() {
    let [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return tab;
}

// Set the text of a given button element in the popup.html UI.
function setButtonState(button: HTMLElement, state: buttonState) {
    void chrome.storage.sync.set({ 'buttonState': state });
    button.innerText = state.buttonText
}

function getButtonState(button:HTMLElement): undefined | buttonState{
    const stringButton = button.id
    let buttonState = undefined
    chrome.storage.sync.get(`${stringButton}_state`,function (res ){
        buttonState = res['buttonState']
    })
    return buttonState
}

