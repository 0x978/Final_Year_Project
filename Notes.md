# Web Scraper Advanced

## TOSDR.org
### Attempt 1: Asking
I tried to ask the TOSDR team to supply a dataset containing any summarised TOS they could provide, but after a week of no reply, I needed another approach.

### Attempt 2: Scraping
TOSDR.org offers "summarised" terms of conditions (although it's more of a uncoupled collection of points regarding the TOS)
[Terms Of Service; Didn't Read](https://edit.tosdr.org/documents)

This is pretty much my only option for summarising TOS without manually summarising 500+ examples myself.

Ultimately the design will follow the logic:
![[Pasted image 20231211010009.png]]
This abstracts a fair amount of logic regarding how to find TOS path, filtering out irrelevant information from scraped TOS etc

#### Scraping a list of websites for which there are summaries
This scraper was simple - go through the list of sites, pick out the URLs that are listed as "terms and conditions" and store them in a text file.

###### Problems:
- A lot of the scraped ToS have no summaries provided.
- Might need to also scrape privacy policies as these seem to have more important information...
	- This is a pretty big issue.

#### Scrape a list of summary points
Pretty simple - picking out the summary points required simple string pattern matching and regex.

###### Problems:
- Might reach some kind of IP timeout - there is a long list of ToS...

#### Scraping TOS off a site
Much more difficult, needed to consider only getting the relevant information, e.g. how do I scrape just the TOS text and not irrelevant info?
- Not yet figured this out...

For now the approach is to take all elements on a page which contain just text, such as "div", "p", "span", "article" etc.

Next problem is finding the site, i opted to first utilise google to search "{site name} terms and conditions" but this might time me out from google services, so as a backup if this occurs I have set up some basic path matching (/terms /terms_and_conditions / t&c etc)


# Current Biggest issues
- [ ] Should I also consider privacy policies? these seem to have the best, most important data...
- [ ] How can I scrape only relevant information from a T&C page?
- [ ] Handling documents with empty summaries..