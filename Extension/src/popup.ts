
// in development, the current state of memory can be read with the following in the extension console
// chrome.storage.sync.get((res) => console.log(res))

interface buttonState {
    buttonText: string,
    isActive: boolean,
}

const DEFAULT_TOS_BUTTON_TEXT = "Summarize T&C"

document.addEventListener('DOMContentLoaded', function () {
    let privacyPolicyButton = document.getElementById('privacyPolicyButton');

    // Null check and assertion
    // Typescript isn't automatically inferring the possibility for HTMLElements to not be null
    // so this workaround will do
    if(privacyPolicyButton === null){
        return
    }
    privacyPolicyButton = privacyPolicyButton as HTMLElement

    // Button initialisation
    // Initialises button state when the popup is opened from memory.
    void buttonInitialiser(privacyPolicyButton)

     // Add listener to button
    privacyPolicyButton.addEventListener('click', async function () {
        let tab = await getCurrentUserTab() // TODO: Why is tab sometimes undefined?

        setButtonState(privacyPolicyButton as HTMLElement, {buttonText: "loading...", isActive: false})

        const res = tab?.id && await chrome.tabs.sendMessage(tab.id, {"message": "summarise_terms"});


        console.log("response:", res) // print to console for now

        setButtonState(privacyPolicyButton as HTMLElement,{buttonText: DEFAULT_TOS_BUTTON_TEXT, isActive: true})
    });



});

// Gets current active user tab.
async function getCurrentUserTab() {
    let [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return tab;
}

// Set the text of a given button element in the popup.html UI.
function setButtonState(button: HTMLElement, state: buttonState) {
    const stringButtonState = `${button.id}_state`
    void chrome.storage.sync.set({ [stringButtonState]: state });
    button.innerText = state.buttonText
}

// fetches the current button state from memory.
async function getButtonState(button: HTMLElement): Promise<undefined | buttonState> {
    const stringButtonState = `${button.id}_state`
    let buttonState = undefined
    await chrome.storage.sync.get(`${stringButtonState}`).then((res) => {
        buttonState = res[stringButtonState]
    })
    return buttonState
}

// Asynchronously fetches and sets button state from memory when popup is opened.
async function buttonInitialiser(button: HTMLElement) {
    const buttonState = await getButtonState(button)
    if (buttonState) {
        setButtonState(button, buttonState)
    }
}