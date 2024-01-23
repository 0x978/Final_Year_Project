// Tries to classify document as "privacy policy" or "terms and conditions"
// Basic logic is to iterate over the first x characters and look for instances of text which identifies the document type
// e.g. "terms of service" or "privacy policy". It presumes the earliest mention of these terms label the document.
// However, if the phrase "terms of service" is prefixed by "this", it will stop looking entirely and take the current as evidence of document type.

import * as fs from 'fs';

const directory = "../Web_Scraper/scraped_data"

let num_wrong = 0

const TERMS_FILE_NAME = "Terms.txt"
const PRIVACY_POLICY_FILE_NAME = "Privacy_Policy.txt"

fs.readdir(directory, (err, files) => {
    for (let i = 0; i < files.length; i++) {
        let subFolder = files[i]
        let currentDirectory = `${directory}/${subFolder}`

        fs.readdir(currentDirectory, (error, subfiles) => {
            for (let j = 0; j < subfiles.length; j++) {

                let file = subfiles[j]

                fs.readFile(`${currentDirectory}/Terms.txt`, "utf-8",
                    (err, fileContent) => {
                        const documentType = parseDocumentType(fileContent)

                        if(file === TERMS_FILE_NAME){
                            if(documentType !== "terms"){
                                console.log(currentDirectory +" " + documentType)
                            }
                        }
                    })

                fs.readFile(`${currentDirectory}/Privacy_Policy.txt`, "utf-8",
                    (err, fileContent) => {
                        const documentType = parseDocumentType(fileContent)

                        if(file === PRIVACY_POLICY_FILE_NAME){
                            if(documentType !== "privacy policy"){
                                //console.log(currentDirectory +" " + documentType)
                            }
                        }
                    })


            }
        })
    }
})

function parseDocumentType(document) {
    if(!document){
        return undefined
    }
    // Remove all punctuation from document, as it causes problem with parsing
    document = document.replace(/[.,\/#!$%\^\*;:{}=\-_`~()]/g, '')

    // Split document by space as a quick hack to iterate over words
    document = document.split(/\s+/)

    // Take first 1000 words - if can't find instance in first 1000 words - return unsure
    document = document.slice(0,1000)

    // some service simply refer to their terms and conditions as "terms"
    // this flag is true if this is the case, and if nothing else is found in the 1000 words, return true
    let terms_flag = false

    const terms_first_words = ["terms"]
    const terms_second_words = ["of","and","&"]
    const terms_third_words = ["conditions","service","use"]

    const privacy_first_words = ["privacy"]
    const privacy_second_words = ["policy","notice","statement"]

    let termsMatchIndex = Infinity
    let privacyMatchIndex = Infinity

    for(let i = 0; i < document.length; i++){
        let prevWord = document[i-1]?.toLowerCase()
        let word = document[i]?.toLowerCase()
        let next_word = document[i+1]?.toLowerCase()
        let third_word = document[i+2]?.toLowerCase()

        if(terms_first_words.includes(word)){
            terms_flag = true
            if(terms_second_words.includes(next_word)){
                if(terms_third_words.includes(third_word)){
                    if(prevWord === "this"){
                        return "terms"
                    }
                    if(termsMatchIndex === Infinity){ // if not yet set terms index
                        termsMatchIndex = i
                    }
                }
            }
        }

        if(privacy_first_words.includes(word)){
            if(privacy_second_words.includes(next_word)){
                if(prevWord === "this"){
                    return "privacy policy"
                }
                if(privacyMatchIndex === Infinity){
                    privacyMatchIndex = i
                }
            }
        }


    }

    if(termsMatchIndex === privacyMatchIndex){
        if(terms_flag){
            return "terms"
        }
    }

    return termsMatchIndex < privacyMatchIndex ? `terms` : `privacy policy ${termsMatchIndex} | ${privacyMatchIndex}`

}
