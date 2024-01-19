
// in development, the current state of memory can be read with the following in the extension console
// chrome.storage.sync.get((res) => console.log(res))

interface buttonState {
    buttonText: string,
    isActive: boolean,
}

const DEFAULT_PRIVACY_BUTTON_TEXT = "Summarise Privacy Policy"
const DEFAULT_TOS_BUTTON_TEXT = "Summarise T&C"

document.addEventListener('DOMContentLoaded', function () {
    let privacyPolicyButton = document.getElementById('privacyPolicyButton');
    let termsConditionsButton = document.getElementById("termsConditionsButton")
    document.getElementById("reset")?.addEventListener('click', () => resetButtonState())

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

// Set the text of a given button element in the popup.html UI.
function setButtonState(button: HTMLButtonElement, state: buttonState) {
    const stringButtonState = `${button.id}_state`
    void chrome.storage.sync.set({ [stringButtonState]: state });
    button.innerText = state.buttonText
    button.disabled = !state.isActive
}

// fetches the current button state from memory.
async function getButtonState(button: HTMLButtonElement): Promise<undefined | buttonState> {
    const stringButtonState = `${button.id}_state`
    let buttonState = undefined
    await chrome.storage.sync.get(`${stringButtonState}`).then((res) => {
        buttonState = res[stringButtonState]
    })
    return buttonState
}

// Asynchronously fetches and sets button state from memory and initialises event listeners.
async function buttonInitialiser(button: HTMLButtonElement) {
    const buttonID = button.id

    // Set button state (text, is button clickable?)
    const buttonState = await getButtonState(button)
    if (buttonState) {
        setButtonState(button, buttonState)
    }

    // add event listener to button.
    // Responsible for running the summariser when the button is pressed.
    button.addEventListener('click', async function () {
        const requestType = buttonID === "privacyPolicyButton"
            ? "Privacy Policy"
            : "Terms and Conditions"

        let tab = await getCurrentUserTab()

        // Set button state to inactive, and text to "Loading"...
        setButtonState(button, {buttonText: "loading...", isActive: false})

        // Change popup HTML to "Loading"
        location.href = '../HTML/Loading.html'

        // Sends message to summariser script to summarise the current page.
        // "RequestType" is either T&Cs or privacy policies
        tab?.id && await chrome.tabs.sendMessage(tab.id, {"message": "summarise_terms",
            "requestType":requestType});
    });
}

// Hopefully not needed in release
// resets button states.
function resetButtonState(){
    chrome.storage.sync.clear().then(_ =>{
        let privacyPolicyButton = document.getElementById('privacyPolicyButton');
        let termsConditionsButton = document.getElementById("termsConditionsButton")
        console.log("Memory cleared")
        setButtonState(privacyPolicyButton as HTMLButtonElement ,{buttonText:DEFAULT_PRIVACY_BUTTON_TEXT, isActive: true})
        setButtonState(termsConditionsButton as HTMLButtonElement ,{buttonText:DEFAULT_TOS_BUTTON_TEXT, isActive: true})
        void chrome.runtime.sendMessage({"message": `off_badge`});
    })
}