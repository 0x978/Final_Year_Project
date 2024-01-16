let listElement = document.getElementById("test")

// fetch the produced summary from background.ts after the page has loaded.
document.addEventListener('DOMContentLoaded', function () {
    chrome.runtime.sendMessage({"message": `fetch_summary`}).then((res) =>{
        listElement!.innerHTML = summaryToBulletPoints(res.summary)
    })
})

// Turns the given summary into bullet points
function summaryToBulletPoints(inputString: string): string {
    const sentences: string[] = inputString.split('. '); // split string by full stop.
    const liElements: string[] = sentences
        .filter(sentence => sentence.trim() !== '') // filter out any blank entries
        .map(sentence => `<li>${sentence}</li>`); // convert each one into a string surrounded by html list tags

    return liElements.join('\n'); // Join the string array into a string, separated by new lines.
}