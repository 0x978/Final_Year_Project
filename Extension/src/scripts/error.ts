const buttonElement:HTMLElement|null = document.getElementById("errorButton")


document.addEventListener('DOMContentLoaded', function () {
    if(buttonElement){
        buttonElement.onclick = () => {
            location.href = "../HTML/popup.html"
        }
    }
})