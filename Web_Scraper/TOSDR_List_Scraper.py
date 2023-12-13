import re
import requests
from bs4 import BeautifulSoup
import os

# This class scrapes a list of URLS for which TOS;DR has summaries for.

class TOSDRListScraper:
    TOSDR_URL = "https://edit.tosdr.org/documents"

    def fetchTOSList(self):
        response = requests.get(self.TOSDR_URL)
        response.encoding = 'utf-8'

        if response.status_code != 200:
            print("ERROR - CONNECTION NOT ESTABLISHED TO TOSDR: ", response.status_code)
            return

        soup = BeautifulSoup(response.text, 'html.parser')
        table_items = soup.find_all(['tr'])  # extract all table rows on page

        for row in table_items:  # loop over table found on page
            found_href = None
            found_text = None
            for child in row.children:
                child = str(child)
                href_regex = re.compile(r'href="([^"]*)"')  # regex picks out the href property of each URL
                text_regex = re.compile(r'(?<=">)(.+?)(?=<)')  # regex picks out the type of document (TOS)

                href = href_regex.search(child)
                text = text_regex.search(child)
                if href:
                    found_href = href.group(1)
                if text:
                    found_text = text.group(1)

            if found_text and "terms" in found_text.lower():
                print(found_text, found_href)
                self.write_to_output(found_text, found_href)

    def write_to_output(self, text, href):
        with open("URL_List.txt", "a", encoding="utf-8") as file:
            file.write(f"{text} {href}\n")


scraper = TOSDRListScraper()
scraper.fetchTOSList()
