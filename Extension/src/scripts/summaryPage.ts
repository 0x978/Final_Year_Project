
let listElement = document.getElementById("summaryPoints")
let ratingElement = document.getElementById("ratingElement")
let titleElement = document.getElementById("title")

// fetch the produced summary from background.ts after the page has loaded.
document.addEventListener('DOMContentLoaded', function () {
    chrome.runtime.sendMessage({"message": `fetch_summary`}).then((res) =>{
        let siteName = stripURL(res.pageURL)
        titleElement!.innerText = `Summary for ${siteName}'s ${res.docType}`
        listElement!.innerHTML = summaryToBulletPoints(res.summary)
        initialiseClassification(res.classification,res.docType,siteName)
        ratingElement!.innerHTML = `Rating: ${res.classification}`
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

// Initialise classification elements with appropriate details.
// Initialises the rating image and a short description of what the rating means
function initialiseClassification(summary:string, docType:string, websiteName:string){
    let description = document.getElementById("ratingDescription")
    let ratingImage = document.getElementById("ratingImage") as HTMLImageElement

    if(!description || !ratingImage){
        return;
    }

    let descriptionHeader = document.getElementById("descriptionHeader")
    if(descriptionHeader){
        descriptionHeader.innerText = `The following points provide a concise summary of the ${docType}:`
    }

    switch (summary){
        case "positive":
            description.innerText = `The ${docType} for ${websiteName} reflect commitment to user privacy and data 
            protection.`
            ratingImage.src = "../images/Positive.png"
            return;
        case "neutral":
            description.innerText = `The ${docType} for ${websiteName} presents a balanced perspective to user privacy,
            not prioritising nor neglecting the privacy of users.`
            ratingImage.src = "../images/Neutral.png"
            return;
        case "negative":
            description.innerText = `The ${docType} for ${websiteName} raises concerns for user privacy and data security.
            Users should exercise caution when interacting with this service, as the ${docType} indicate potential risks
            to user privacy.`
            ratingImage.src = "../images/Negative.png"
            return;
    }
}

// Removes extra detail from a given URL
// e.g: "https://www.example.com/ becomes "example.com"
function stripURL(url: string): string{

    if(!url){
        return "this service"
    }

    // Regex for removing the domain name from a URL
    // Regex from: https://stackoverflow.com/questions/25703360/regular-expression-extract-subdomain-domain
    const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/;
    const match = url.match(domainRegex);

    if (match && match[1]) {
        return match[1];
    } else { // If no match, return "this service"
        return "this service";
    }
}