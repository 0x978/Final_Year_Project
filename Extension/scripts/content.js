chrome.runtime.onMessage.addListener(
    function(request) {
        if( request.message === "summarize_terms" ) {
            let pageContent = document.body.innerText;
            receiveSummary(pageContent)
        }
    }
);

async function receiveSummary(document){
    const res = await fetch("http://127.0.0.1:5000/summarise",{
        method:"POST",
        body: document
    })
    const summary = await res.json()
    console.log(summary)
}