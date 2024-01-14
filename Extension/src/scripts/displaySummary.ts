let xyz = document.getElementById("test")


chrome.runtime.onMessage.addListener(function (request) {
    if (request.message === "send_summary") {
        console.log(request.response)
        xyz!.innerText = request.response
    }
});