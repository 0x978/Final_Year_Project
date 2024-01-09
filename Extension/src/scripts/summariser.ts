// Chrome makes doing anything asynchronously challenging
// as of 9 days ago it is being looked at by chrome developers
// https://bugs.chromium.org/p/chromium/issues/detail?id=1185241
// Logic in the file follows below URL for solution to above chrome issue
// https://stackoverflow.com/questions/53024819/sendresponse-not-waiting-for-async-function-or-promises-resolve

chrome.runtime.onMessage.addListener( (request,_,sendResponse) => {
    if (request.message === "summarise_terms") {
        //scrape_page()
        console.log("received summary request")
        let pageContent = document.body.innerText;

        (async () => {
            const res = await receiveSummary(pageContent);
            sendResponse({"res": res})
        })();
        return true

    } else {
        console.log("Failed summary")
        sendResponse({"res": null})
        return true

    }
})

async function receiveSummary(document:String){
    const res = await fetch("http://127.0.0.1:5000/summarise",{
        method:"POST",
        body: JSON.stringify(document) //converts to a JSON string.
    })
    console.log("Received response")
    return await res.json()
}

function scrape_page(){
    // Similar to the Generic web scraper, select only elements containing TOS / Privacy Policy text
    const pageContent = Array.from(new Set(document.querySelectorAll(
        'p, div > *, span, article, section, b, u, li, ol, strong, em, blockquote, br, h1, h2, h3, h4, h5, section')
    )) as HTMLElement[]


    // Filter out any elements with the below items in their CSS class name.
    // These class names are often found in elements not needed for summarisation
    const excludeKeywords = ["head", "footer", "nav", "menu", "overlay", "bottom", "map", "button","btn","menu",
        "navigation"]

    let uniqueContentSet:Set<String> = new Set()

    // Check each element class name against each exclusion keyword.
    // Add to set only if not in exclusion list.
    for (let i = 0; i < pageContent.length; i++) {
        const elementClassName = pageContent[i]?.className.toLowerCase()

        for (let j = 0; j < excludeKeywords.length; j++) {
            const word = excludeKeywords[j];

            if (word && elementClassName?.includes(word)) {
                break;
            }
        }

        const elementText = pageContent[i]?.innerText?.trim().replace(/\s+/g, ' ')
        elementText && uniqueContentSet.add(elementText);
    }


    // Extract text from selected elements.
    const uniqueContentArray = Array.from(uniqueContentSet)

    console.log(uniqueContentArray.join())
}