const characterCountElement:HTMLElement|null = document.getElementById("characterCount")
const estimatedTimeElement:HTMLElement|null = document.getElementById("loadingTime")


// Updates document length / estimated time on initial button press.
// This needs to be separate from subsequent opens of the popup otherwise
// there is a race condition with the length being calculated by background.ts
chrome.runtime.onMessage.addListener( (request) => {
    if (request.message == "send_summary_length" && characterCountElement && estimatedTimeElement) {
        let documentLength = request.doc_length
        let estimatedTime = calculateEstimatedTime(documentLength)

        characterCountElement.innerHTML = `Document length: ${documentLength}`
        estimatedTimeElement.innerHTML = `Estimated time: ${estimatedTime} seconds`
    }
})

// Updates document length / estimated time on subsequent opening of popup.
// Since this script runs again each time the popup is opened, the length needs to be stored somewhere else.
// Since the length is processed by background.ts anyway, it's stored there and can be received with a message.
document.addEventListener('DOMContentLoaded', function () {
    if(characterCountElement && estimatedTimeElement){
        chrome.runtime.sendMessage({"message": 'getDocumentLength'}).then((res) =>{
            let estimatedTime = calculateEstimatedTime(res.docLength)
            characterCountElement.innerHTML = `Document length: ${(res.docLength)}`
            estimatedTimeElement.innerHTML = `Estimated time: ${estimatedTime} seconds`
        })
    }
})

// Logic for this function depends on the fact the summariser can summarise ~20,000 chars in ~1 minute
// The maths for this will need to change depending on the capabilities of the server
// It's also a really rough estimate - the growth for summary vs length is not linear, but it is treated as such below.
// TODO ^^^
function calculateEstimatedTime(documentLength:number){
    const charsPerMin = 20000

    const estimate_seconds:number = (documentLength / charsPerMin) * 60

    return Math.round(estimate_seconds)
}

// If an error occurs during summarisation, this message is received from background.ts.
// if received, open the error html popup
chrome.runtime.onMessage.addListener( (request) => {
    if (request.message == "summariser_error") {
        location.href = "../HTML/error.html"
    }
})