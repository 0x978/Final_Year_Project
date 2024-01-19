
// in development, the current state of memory can be read with the following in the extension console
// chrome.storage.sync.get((res) => console.log(res))



document.addEventListener('DOMContentLoaded', function () {
    let privacyPolicyButton = document.getElementById('privacyPolicyButton');
    let termsConditionsButton = document.getElementById("termsConditionsButton")

    // Null check
    if (privacyPolicyButton === null || termsConditionsButton === null) {
        return
    }

    // Button initialisation
    // Initialises button state and adds event handler.
    // need to cast to HTMLButtonElement as TypeScript isn't inferring this automatically
    void buttonInitialiser(privacyPolicyButton as HTMLButtonElement)
    void buttonInitialiser(termsConditionsButton as HTMLButtonElement)

    // If the extension badge is currently set as "done", set it to "OFF" when the user opens the extension popup.
    chrome.action.getBadgeText({}, (badgeText) => {
        if(badgeText === "DONE"){
            void chrome.runtime.sendMessage({"message": `off_badge`});
        }
    })

});

// Gets current active user tab.
async function getCurrentUserTab() {
    let [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return tab;
}

// Asynchronously fetches and sets button state from memory and initialises event listeners.
async function buttonInitialiser(button: HTMLButtonElement) {
    const buttonID = button.id

    // add event listener to button.
    // Responsible for running the summariser when the button is pressed.
    button.addEventListener('click', async function () {
        const requestType = buttonID === "privacyPolicyButton"
            ? "Privacy Policy"
            : "Terms and Conditions"

        let tab = await getCurrentUserTab()

        // Change popup HTML to "Loading"
        location.href = '../HTML/Loading.html'

        // Sends message to summariser script to summarise the current page.
        // "RequestType" is either T&Cs or privacy policies
        tab?.id && await chrome.tabs.sendMessage(tab.id, {"message": "summarise_terms",
            "requestType":requestType});
    });
}

