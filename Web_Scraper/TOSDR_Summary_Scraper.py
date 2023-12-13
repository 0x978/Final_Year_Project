import re
import requests
from bs4 import BeautifulSoup
import os

# This class extracts summaries from a given TOS;DR url

class TOSDR_Summary_Scraper:

    def scrape_from_url(self, url):
        response = requests.get(url)
        response.encoding = 'utf-8'

        if response.status_code != 200:
            return False

        text_regex = re.compile(r'(?<=">)(.+?)(?=<)') # Regular expression extracts text from html elements
        soup = BeautifulSoup(response.text, 'html.parser')
        table_items = soup.find_all(['tr']) # create a list of all table rows

        h1_elements = soup.find_all(['h1'])
        site_name = text_regex.search(str(h1_elements)).group(1)

        extracted_point_array = [] # Stores all extracted summary points.
        for item in table_items:
            for child in item.children:
                str_child = str(child)
                if "<td" in str_child: # Only look at the table cell elements
                    # Extracting the summary point using basic pattern matching
                    if "title=\"View more details\"" in str_child: # only found in element containing summary
                        text = text_regex.search(str_child)
                        extracted_point = text.group(1)
                        extracted_point_array.append(extracted_point)

        return [site_name,extracted_point_array]



scraper = TOSDR_Summary_Scraper()
scraper.scrape_from_url("https://edit.tosdr.org/services/230")
print(scraper.scrape_from_url("https://edit.tosdr.org/services/230"))