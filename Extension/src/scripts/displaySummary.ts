let xyz = document.getElementById("test")

// fetch the produced summary from background.ts after the page has loaded.
document.addEventListener('DOMContentLoaded', function () {
    chrome.runtime.sendMessage({"message": `fetch_summary`}).then((res) =>{
        console.log(res)
        xyz!.innerText = res.summary
    })
})