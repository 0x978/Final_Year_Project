import re
import requests
from bs4 import BeautifulSoup
import os
from googlesearch import search
from Generic_site_tos_scraper import GenericSiteTosScraper

# This class controls all the other scrapers, running them and storing results.

class Controller:

    index = 0; # If the scraper crashes or times out, this will be used to know where it got up to in the list.

    def main(self):
        site_scraper = GenericSiteTosScraper()

        PLACEHOLDER_SITE_NAME = "Paypal"
        TOS = site_scraper.scrape(PLACEHOLDER_SITE_NAME)
        self.write_to_file(TOS,PLACEHOLDER_SITE_NAME)

    def write_to_file(self, text, website_name):
        directory_path = "TOS/" + website_name
        os.makedirs('TOS', exist_ok=True)
        os.makedirs(directory_path)

        file_path = os.path.join(directory_path, f'{website_name}.txt')

        with open(file_path, 'a', newline='', encoding='utf-8') as textfile:
            textfile.write(f"{text}")


test = Controller()
test.main()