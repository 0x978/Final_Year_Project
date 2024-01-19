const buttonElement:HTMLElement|null = document.getElementById("errorButton")

// When the error page loads, assign a function to return back to the normal popup page to the button.
document.addEventListener('DOMContentLoaded', function () {
    if(buttonElement){
        buttonElement.onclick = () => {
            void chrome.runtime.sendMessage({"message": "setDefault"}); // Received by background.ts
            location.href = "../HTML/popup.html"
        }
    }
})