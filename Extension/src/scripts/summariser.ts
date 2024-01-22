// Chrome makes doing anything asynchronously challenging
// as of 9 days ago it is being looked at by chrome developers
// https://bugs.chromium.org/p/chromium/issues/detail?id=1185241
// Logic in the file follows below URL for solution to above chrome issue
// https://stackoverflow.com/questions/53024819/sendresponse-not-waiting-for-async-function-or-promises-resolve

interface requestType{
    doc: String,
    doctype: String
}

chrome.runtime.onMessage.addListener( (request,_,sendResponse) => {
    if (request.message === "summarise_terms") {
        let documentType = request.requestType
        console.log("received summary request")
        changeIcon("on")
        let pageContent = scrape_page()
        void chrome.runtime.sendMessage({"message": "setLoading", "documentLength":pageContent.length});

        (async () => {
            const res = await receiveSummary(pageContent,documentType);

            if(!res){
                void chrome.runtime.sendMessage({"message": "receive_response", "response":undefined});
                return
            }

            changeIcon("done")

            // Pass the summary to "background.ts" - which will then open a new tab.
            void chrome.runtime.sendMessage({"message": "receive_response", "summary":res.summarized_text,
                "classification":res.classification});
        })();
        return true

    } else {
        console.log("Failed summary")
        sendResponse({"res": null})
        return true

    }
})

async function receiveSummary(document:String,documentType:String){
    const requestData:requestType = {
        doc: document,
        doctype: documentType
    }

    try{
        const res = await fetch("http://127.0.0.1:5000/summarise",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        })
        console.log("Received response")
        return await res.json()
    }
    catch {
        return undefined
    }
}

function scrape_page(){

    // Select all elements on the page of the given HTML element types.
    const pageContent = Array.from(document.querySelectorAll<HTMLElement>(
        'p, div, span, article, section, b, u, li, ol, strong, em, blockquote, br, h1, h2, h3, h4, h5, section'
    ));


    // Filter out any elements with the below items in their CSS class name.
    // These class names are often found in elements not needed for summarisation
    const exclusionClassNameList = ["head", "footer", "nav", "menu", "overlay", "bottom", "map", "button","btn",
        "menu", "navigation","popup","notice"]

    // avoid duplicate content by utilising a set (TODO is this redundant?)
    let uniqueContentSet:Set<String> = new Set()

    // Check each element class name against each exclusion keyword.
    // Add to set only if element class name doesn't contain any words in exclusion list
    outer:
    for (let i = 0; i < pageContent.length; i++) {
        const elementClassName = pageContent[i]?.className.toLowerCase()

        for (let j = 0; j < exclusionClassNameList.length; j++) {
            const word = exclusionClassNameList[j];

            if (word && elementClassName?.includes(word)) {
                continue outer; // skip to next item in list.
            }
        }

        const element = pageContent[i]
        const elementText = element && retrieveTextFromElement(element)
        elementText && uniqueContentSet.add(elementText.trim())
    }

    const uniqueContentArray = Array.from(uniqueContentSet)

    return uniqueContentArray.join(" ") // join each item with space separator
}

// There is no property on an Element or HTMLElement to retrieve its text (why!?)
// both "textContent" and "innerText" retrieves the text from an element AND its children.
// thus this function will retrieve the text of an HTML element, or return undefined if the element has no text.
function retrieveTextFromElement(element:HTMLElement):string|undefined{

    const children = Array.from(element.childNodes) // get all children of element

    // Find and return the text of the first element child which is a "text node" - an element which contains some text.
    for(let i = 0; i < children.length; i++){
        const child = children[i]
        if(child?.nodeType === 3){ // A "text node" is "nodeType" 3.
            // Remove any excessive spacing using regex before returning.
            return child.textContent?.trim().replace(/\s+/g, ' ')
        }
    }
    return undefined
}

// calls upon the service worker to change the extension icon text.
// Accepts only the strings "on", "off" or "done" - signifying the three states the service worker can handle.
// Shows the power of Typescript types - able to define exactly what strings can be accepted.
function changeIcon(message:"on"|"off"|"done"){
    void chrome.runtime.sendMessage({"message": `${message}_badge`});
}