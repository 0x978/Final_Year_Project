// Basic logic is to find the term "privacy policy" or "terms" in the text
// and simply take the first instance of these terms in the text as the document type.

import * as fs from 'fs';

const directory = "../Web_Scraper/scraped_data"

fs.readdir(directory, (err, files) => {
    for (let i = 0; i < files.length; i++) {
        let subFolder = files[i]
        let currentDirectory = `${directory}/${subFolder}`

        fs.readdir(currentDirectory, (error, subfiles) => {
            for (let j = 0; j < subfiles.length; j++) {
                let item = subfiles[j]

                if (item === "Terms.txt") {
                    fs.readFile(`${currentDirectory}/Terms.txt`, "utf-8",
                        (err, data) => {
                            const documentType = parseDocumentType(data)

                            if(documentType === "Privacy Policy"){
                                console.log(currentDirectory)
                            }

                        })
                }

            }
        })

    }
})

function parseDocumentType(document) {
    // Remove all punctuation from document, as it causes problem with parsing
    document = document.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')

    // Split document by space as a quick hack to iterate over words
    document = document.split(/\s+/)

    const privacyKeywords = ["privacy","policy"];
    const termsKeywords = ["terms","conditions", "tos"];


    let privacy_score = 0
    let terms_score = 0

    for(let i = 0 ; i < document.length; i++){
        const currentWord = document[i].toLowerCase()

        if(privacyKeywords.includes(currentWord)){
            privacy_score += 0.5

            const nextWord = document[i+1]
            if (nextWord){
                if(nextWord.toLowerCase() === "policy" || nextWord.toLowerCase() === "statement" || nextWord.toLowerCase() === "notice"){
                    privacy_score += 1
                }
            }

        }

        if(termsKeywords.includes(currentWord)){
            terms_score += 1
        }
    }

    if(privacy_score === 0 && terms_score === 0){
        return undefined
    }

    const classification = privacy_score > terms_score ? "Privacy Policy" : "terms and conditions"

    return classification

}