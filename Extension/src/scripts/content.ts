chrome.runtime.onMessage.addListener(
    function(request) {
        if( request.message === "summarize_terms" ) {
            let pageContent = document.body.innerText;
            void receiveSummary(pageContent)
        }
    }
);

async function receiveSummary(document:String){
    const res = await fetch("http://127.0.0.1:5000/summarise",{
        method:"POST",
        body: JSON.stringify(document) //converts to a JSON string.
    })
    const summary = await res.json()
    console.log(summary)
}