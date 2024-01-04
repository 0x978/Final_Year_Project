chrome.runtime.onMessage.addListener(
    function(request) {
        if( request.message === "summarize_terms" ) {
            let pageContent = document.body.innerText;
            console.log(pageContent);
        }
    }
);