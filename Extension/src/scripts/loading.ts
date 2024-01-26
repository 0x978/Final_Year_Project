const characterCountElement:HTMLElement|null = document.getElementById("characterCount")
const timeElement:HTMLElement|null = document.getElementById("timeElement")


// Updates document length / estimated time on initial button press.
// This needs to be separate from subsequent opens of the popup otherwise
// there is a race condition with the length being calculated by background.ts
chrome.runtime.onMessage.addListener( (request) => {
    if (request.message == "send_summary_length" && characterCountElement && timeElement) {
        let documentLength = request.doc_length
        let estimatedTime = calculateEstimatedTime(documentLength)
        timeElement.innerHTML = `Estimated time: ${estimatedTime} seconds remaining`
    }
})

// Updates document length / estimated time on subsequent opening of popup.
// Since this script runs again each time the popup is opened, the length needs to be stored somewhere else.
// Since the length is processed by background.ts anyway, it's stored there and can be received with a message.
document.addEventListener('DOMContentLoaded', function () {
    let estimatedTime = 0
    if(characterCountElement && timeElement){
        chrome.runtime.sendMessage({"message": 'getDocumentLength'}).then((res) =>{
            estimatedTime = calculateEstimatedTime(res.docLength)
            characterCountElement.innerHTML = `Document length: ${(res.docLength)}`
            timeElement.innerHTML = `Estimated time: ${estimatedTime} seconds`
        })
    }


    // Calculates the amount of time that has passed since the summarisation process has started and displays it
    // Calculated via the difference between the current time and the start time - with the start time sourced from background.ts
    // It is necessary to do this, and not just start a timer, as the state of the popup is forgotten each time it is open
    // And thus the elapsed time is forgotten each time the popup is open
    let start:number = 0

    // Sets start time on initial popup open
    // Same race condition applies as document length, thus it is necessary to fetch start time this way.
    chrome.runtime.onMessage.addListener( (request) => {
        if (request.message == "send_start_time") {
            start = request.time
        }
    })

    // Below updates the element every second, or on subsequent opens of the popup.
    chrome.runtime.sendMessage({"message": 'getSummaryStartTime'}).then((res) => {
        start = res.time
    })

    setInterval(() => { // update elapsed time each second
        let time = Date.now()
        let elapsedSeconds = Math.floor(((time - start) / 1000)) // Time is given in ms, convert
        timeElement!.innerHTML  = `Estimated time: ${estimatedTime - elapsedSeconds} seconds remaining`;
    }, 1000);

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