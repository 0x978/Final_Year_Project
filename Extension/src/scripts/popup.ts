// This file is responsible for running the default popup.html file.
// It infers the document type for every page the user visits to find whether this is "terms and conditions" or "privacy policy"
// It then initialises the relevant button depending on this information.
// It provides an onclick function for each button, when pressed, it passes a request to summariser.ts to summarise the current page

type documentTypes = "Privacy Policy" | "Terms and Conditions"

document.addEventListener('DOMContentLoaded', function () {
    let privacyPolicyButton = document.getElementById('privacyPolicyButton');
    let termsConditionsButton = document.getElementById("termsConditionsButton")
    let genericSummariseButton = document.getElementById("genericSummariseButton")

    // Null check
    if (privacyPolicyButton === null || termsConditionsButton === null) {
        return
    }

    void initialiseButtons(privacyPolicyButton as HTMLButtonElement,termsConditionsButton as HTMLButtonElement
        ,genericSummariseButton as HTMLButtonElement)

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

// Given all popup.html buttons, initialises the relevant buttons depending on the page context.
// i.e. if on a privacy policy page, only a button which summarises privacy policy is enabled.
// If uncertain, enable both buttons.
// It sources the information regarding the page content and URL path from summariser.ts who has access to this info
async function initialiseButtons(privacyPolicyButton:HTMLButtonElement,termsConditionsButton:HTMLButtonElement,
                                 genericSummariseButton:HTMLButtonElement) {

    let tab = await getCurrentUserTab()
    let res = tab?.id && await chrome.tabs.sendMessage(tab.id, {
        "message": "receivePageDetails",
    })
    let pageContent = res.pageContent
    let websitePath = res.websitePath

    // try to parse document type from current URL path first
    let documentType:documentTypes|undefined = parseDocumentTypeFromPath(websitePath)

    // If unable to parse from URL, parse from document content instead.
    if(documentType === undefined){
        documentType = parseDocumentType(pageContent)
    }

    if(documentType === undefined){ // Document type not inferred
        void initialiseButton(privacyPolicyButton,"Privacy Policy")
        void initialiseButton(termsConditionsButton,"Terms and Conditions")
    }

    else{ // Document type was inferred, initialise a relevant button.
        genericSummariseButton.innerHTML = `Summarise ${documentType}`
        void initialiseButton(genericSummariseButton,documentType)
    }

}

// Given a button object and indication whether this button is responsible for "privacy policy" or "terms and conditions",
// Initialises the button to make it visible and give it a listener for the onclick event.
// The onclick event will send a request to summariser.ts to summarise the current tab's content.
async function initialiseButton(button: HTMLButtonElement, documentType:documentTypes) {

    button.hidden = false

    // add event listener to button.
    // Responsible for running the summariser when the button is pressed.
    button.addEventListener('click', async function () {
        const requestType = documentType

        let tab = await getCurrentUserTab()

        // Change popup HTML to "Loading"
        location.href = '../HTML/Loading.html'

        // Sends message to summariser script to summarise the current page.
        // "RequestType" is either T&Cs or privacy policies
        tab?.id && await chrome.tabs.sendMessage(tab.id, {"message": "summarise_terms",
            "requestType":requestType});
    });
}

// Given the page content, infers where the document is "terms and conditions" or "privacy policy"
// If it is unsure - it returns undefined
// Works by looking at first 1000 words and taking first instance of text which indicates document type.
// Checks if any of these instances are prefixed by "this" - if so, this can guarantee document type - end execution
function parseDocumentType(document:string):documentTypes|undefined {
    if(!document){
        return undefined
    }

    // Remove all punctuation from document, as it causes problem with parsing
    document = document.replace(/[.,\/#!$%\^\*;:{}=\-_`~()]/g, '')

    // Split document by space as a quick hack to iterate over words
    let words: string[] = document.split(/\s+/);

    // Take first 1000 words
    let selectedWords: string[] = words.slice(0, 1000);

    // some service simply refer to their terms and conditions as "terms"
    // this flag is true if this is the case, and if nothing else is found in the 1000 words, return true
    let terms_flag = false

    // Arrays holding the possible words which may indicate terms or may indicate privacy policy
    const terms_first_words = ["terms"]
    const terms_second_words = ["of","and","&"]
    const terms_third_words = ["conditions","service","use"]
    const privacy_first_words = ["privacy"]
    const privacy_second_words = ["policy","notice","statement"]

    // holds the index at which the instance of text deciding document text was found.
    // At end of document parsing - will take the lowest value.
    let termsMatchIndex = Infinity
    let privacyMatchIndex = Infinity

    for(let i = 0; i < selectedWords.length; i++){
        let prevWord = selectedWords[i-1]?.toLowerCase()
        let word = selectedWords[i]?.toLowerCase()
        let next_word = selectedWords[i+1]?.toLowerCase()
        let third_word = selectedWords[i+2]?.toLowerCase()

        if(word && terms_first_words.includes(word)){
            terms_flag = true
            if(next_word && terms_second_words.includes(next_word)){
                if(third_word && terms_third_words.includes(third_word)){
                    if(prevWord === "this"){
                        return "Terms and Conditions"
                    }
                    if(termsMatchIndex === Infinity){
                        termsMatchIndex = i
                    }
                }
            }
        }

        if(word && privacy_first_words.includes(word)){
            if(next_word && privacy_second_words.includes(next_word)){
                if(prevWord === "this"){
                    return "Privacy Policy"
                }
                if(privacyMatchIndex === Infinity){
                    privacyMatchIndex = i
                }
            }
        }


    }

    if(termsMatchIndex === privacyMatchIndex){ // if the indexes are even (no instances were found)
        if(terms_flag){
            return "Terms and Conditions"
        }
        else{
            return undefined
        }
    }

    return termsMatchIndex < privacyMatchIndex ? `Terms and Conditions` : `Privacy Policy`

}

// Given a URL path, analysing it for keywords which may give away the document type.
// e.g. "terms" or "privacy"
function parseDocumentTypeFromPath(path:string):documentTypes|undefined{
    path = path.toLowerCase()

    const privacy_words = ["privacy","security","data protection"]
    const terms_words = ["terms","tos","t&c"]

    for(const word of privacy_words){
        if(path.includes(word)) {
            return "Privacy Policy"
        }
    }

    for(const word of terms_words){
        if (path.includes(word)) {
            return "Terms and Conditions"
        }
    }

    return undefined
}
