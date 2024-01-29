const buttonElement:HTMLElement|null = document.getElementById("errorButton")

// When the error page loads, assign a function to return back to the normal popup page to the button.
document.addEventListener('DOMContentLoaded', function () {
    initTheme()

    if(buttonElement){
        buttonElement.onclick = () => {
            close()
        }
    }

    // Try to infer if the error occurred due to timeout.
    // If so, customise the error page to reflect this.
    chrome.runtime.sendMessage({"message": 'receiveDetailsOnError'}).then((res) => {
        let reasonListElement = document.getElementById("reasonList")
        let errorReasonElement = document.getElementById("errorExplanation")

        let documentLength = res.documentLength || undefined
        let startTime = res.startTime || undefined
        let currentTime = Date.now()

        let elapsedTime = currentTime - startTime

        // If elapsed time is more than 470 seconds - it's likely the request has timed out.
        // The user can be shown a different error in this case
        if(elapsedTime >= 470000 && reasonListElement && errorReasonElement){
            errorReasonElement.innerText = "Your request has timed out by reaching the maximum duration of 480 seconds. \n \n To prevent this, you could:"
            reasonListElement.innerHTML = `<li>Attempt summarisation on a document with lower character count (this document was <b> ${documentLength} </b> characters)</li>` +
                                          "<li>Ensure the document you are summarising is in <b>English</b>.</li> " +
                                           "<li>Ensure the document you are summarising is either the <b>terms and conditions</b> or <b>Privacy Policy</b> for the service</li>"
        }

    })
})

// Initialises dark theme / light theme as appropriate
function initTheme(){
    let mainDiv = document.getElementById("main-div")
    chrome.storage.sync.get(["isDark"], (result) => {
        const isDark = result["isDark"]
        if (!isDark && mainDiv) {
            console.log(isDark, mainDiv)
            mainDiv.classList.remove("dark-theme")
        }
    });
}