const characterCountElement:HTMLElement|null = document.getElementById("characterCount")
const timeElement:HTMLElement|null = document.getElementById("timeElement")
const progressBar = document.getElementById("progress-bar")
const headerElement = document.getElementById("header")
const overTimeElement = document.getElementById("overtime")

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
    initialiseTheme() // initialise dark or light theme

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
        let remainingTime = estimatedTime - elapsedSeconds

        // If exceeded the estimated time
        if(elapsedSeconds > estimatedTime){
            if(overTimeElement){
                overTimeElement.hidden = false
                progressBar!.hidden = true
                let overTimeRemainingTime = 800 - elapsedSeconds
                timeElement!.innerHTML = `Remaining time until timeout: ${overTimeRemainingTime} seconds`
            }

        }
        // If not exceeded the estimated time.
        else{
            updateLoadingBar(remainingTime,estimatedTime)
            timeElement!.innerHTML  = `Estimated time: ${remainingTime} seconds remaining`;
        }

        updateHeader()

    }, 1000);

})

// Logic for this function depends on the fact the summariser can summarise ~20,000 chars in ~1 minute
// The maths for this will need to change depending on the capabilities of the server
// It's also a really rough estimate - the growth for summary vs length is not linear, but it is treated as such below.
// TODO ^^^
function calculateEstimatedTime(documentLength:number){
    const charsPerMin = 20000

    const estimate_seconds:number = (documentLength / charsPerMin) * 60

    const rounded_estimation = Math.round(estimate_seconds)

    // Minimum estimated time - 15 seconds
    if(rounded_estimation < 15){
        return 15
    }

    return rounded_estimation
}


function updateLoadingBar(remainingTime:number,estimatedTime:number){
    // subtract 1 from remaining time divided by estimated time *100 to get % time elapsed
    const progressWidth = (1 - remainingTime / estimatedTime) * 100;
    progressBar!.style.width = progressWidth + '%';
}

function initialiseTheme(){
    let mainDiv = document.getElementById("main-div")
    chrome.storage.sync.get(["isDark"], (result) => {
        const isDark = result["isDark"]
        if (!isDark && mainDiv) {
            mainDiv.classList.remove("dark-theme")
        }
    });
}

// Changes the h1 header element to have a bit more feedback, appending an extra dot.
// If it currently has 3 dots, set back to 1.
// Livens up the UI while loading
function updateHeader(){
    if(headerElement){
        let headerText = headerElement.innerText
        if(headerText === "Summarising..."){
            headerElement.innerText = "Summarising."
        }
        else{
            headerElement.innerText = headerText + "."
        }
    }
}