import re
import time
import requests
from bs4 import BeautifulSoup, ResultSet

'''This class, when given a service's URL will:
  - Extract the terms and conditions URL (if present).
  - Extract the Privacy Policy URL (if present).
  - Extract any summary points pertaining to this service's Terms and Conditions.
  - Extract any summary points pertaining to this service's Privacy Policy.
  This can take up to 5 minutes per service.
'''


class TOSDR_Summary_Scraper:
    def __init__(self):
        self.serviceInformation = {
            "Website Name": None,
            "Terms_URL": None,  # The URL to the TOS for the current service being examined
            "Privacy_URL": None,  # The url to the Privacy Policy for the current service being examined.
            "Terms_Summaries": [],# Contains all the summary points related to the terms and conditions of this service
            "Privacy_Summaries": [],  # Contains all the summary points related to the privacy policy of this service.
        }

    def scrape_from_url(self, url):
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
                              ' Chrome/120.0.0.0 Safari/537.36'}
            response = requests.get(url, headers=headers)
        except:
            return None
        response.encoding = 'utf-8'

        if response.status_code != 200:
            return None

        text_regex = re.compile(r'(?<=">)(.+?)(?=<)')  # Regular expression extracts text from any html element
        soup = BeautifulSoup(response.text, 'html.parser')
        table_items = soup.find_all(['tr'])  # create a list of all table rows

        # Picking out the website name.
        h1_elements = soup.find_all(['h1'])
        website_name = text_regex.search(str(h1_elements)).group(1)
        self.serviceInformation["Website Name"] = website_name

        if len(table_items) == 0:  # If there is no summary on this page, exit early.
            return self.serviceInformation

        # TOSDR puts "Discontinued" in the names of services which are no longer available.
        # Don't include these as will not be able to scrape the TOS documents.
        if "discontinued" in website_name.lower():
            return self.serviceInformation

        for item in table_items:
            # Searching for elements which contains a summary point.
            for child in item.children:
                str_child = str(child)

                if "<td" in str_child:  # Only look at the table cell elements
                    # Extracting the summary point using basic pattern matching
                    if "title=\"View more details\"" in str_child:  # property only found in element containing summary
                        text = text_regex.search(str_child)
                        extracted_point = text.group(1)

                        # Finds what document this summary is pulled from.
                        # Will also update the TOS / Privacy Policy URL for this service if necessary.
                        element_href = self.find_href_from_element(str_child)
                        source = self.find_source(f'https://edit.tosdr.org/{element_href}')

                        # Replace any references to the service in the summary to "This service"
                        # Convert to lowercase, so it can be ensured a match is found
                        lower_case_website_name = website_name.lower()
                        lower_case_point = extracted_point.lower()
                        if lower_case_website_name in lower_case_point:
                            extracted_point = lower_case_point.replace(lower_case_website_name, "This service")

                        # Depending on the source, append this summary point to appropriate array:
                        if source == "terms":
                            self.serviceInformation["Terms_Summaries"].append(extracted_point)
                        elif source == "privacy policy":
                            self.serviceInformation["Privacy_Summaries"].append(extracted_point)

        return self.serviceInformation

    # Given a single summary point, finds whether this summary point belongs to a service's terms and conditions,
    # or, their privacy policy. This method will also update the TOS / Privacy policy URl for this service.
    def find_source(self, element):
        time.sleep(0.5)  # Try to keep requests at a reasonable pace.
        source = None
        response = requests.get(element)
        response.encoding = 'utf-8'

        if response.status_code != 200:  # If request sends an invalid response, return None.
            return None

        soup = BeautifulSoup(response.text, 'html.parser')
        cite_element = soup.find_all(['cite'])
        anchor_elements = soup.find_all(['a'])

        # If there exists a "Cite" element, finding the source is very easy, as the cite element directly states it.
        if cite_element:
            cite_element_text = cite_element[0].text

            # If the cite contains "terms", conclude it originates from the terms and conditions
            if "terms" in cite_element_text.lower():
                source = "terms"
                if not self.serviceInformation["Terms_URL"]:  # If the Terms of Service URL is not set, find it.
                    self.serviceInformation["Terms_URL"] = self.find_source_url(anchor_elements)

            # If the cite contains "Privacy policy", conclude it originates from the privacy policy.
            elif "privacy policy" in cite_element_text.lower():
                source = "privacy policy"
                if not self.serviceInformation["Privacy_URL"]:  # If the Privacy Policy URL is not set, find it.
                    self.serviceInformation["Privacy_URL"] = self.find_source_url(anchor_elements)

        # TODO: Find some way to see if I can find the source, even if not directly cited.

        return source

    # Given a summary point, finds the URL of the terms and conditions, or, privacy policy for which it is derived from.
    # It searches through all "Anchor" elements on the page, until finding the one linked to the relevant document.
    def find_source_url(self, elements: ResultSet):  # Parameter "Element" MUST be a "ResultSet" type.
        href_regex = re.compile(r'<a\s+href="([^"]+)"')
        for element in elements:
            if element.text == "link":  # The relevant anchor element needed uniquely has the text "Link"
                str_element = str(element)
                element_href_match = href_regex.search(str_element)
                if element_href_match:
                    element_href = element_href_match.group(1)
                    return element_href
        return None

    # Given the string version of an HTML element, strip out the "HREF" tag.
    # This gives the URL the element points to.
    def find_href_from_element(self, str_element: str):
        href_regex = re.compile(r'<a\s+href="([^"]+)"')
        element_href_match = href_regex.search(str_element)
        if element_href_match:
            element_href = element_href_match.group(1)
            return element_href
        else:
            return None

# Below for testing purposes
# scraper = TOSDR_Summary_Scraper()
# print(scraper.scrape_from_url("https://edit.tosdr.org/services/2407"))
# print(scraper.find_source("https://edit.tosdr.org/points/1082"))
