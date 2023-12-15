import re
import requests
from bs4 import BeautifulSoup
import os

# This class attempts to scrape the Terms of Service from a given website, by name.

class GenericSiteTosScraper:

    def scrape(self, URL):

        if not URL:
            return None

        response = requests.get(URL)
        response.encoding = 'utf-8'

        # If the website gives an invalid response code, return None.
        if response.status_code != 200:
            print(f'Error ({response.status_code}) with site URL: {URL}')
            return None

        soup = BeautifulSoup(response.text, 'html.parser')

        # find the potential tags which might contain the terms and conditions data.
        # These are tags which usually contain long text
        potential_terms_tags = soup.find_all(['p', 'div', 'span', 'article', 'section', 'b'])
        unique_content = [] # Will be updated to hold any information not yet scraped on this site.

        for element in potential_terms_tags:  # consider only these elements

            str_element = str(element)

            # Pre-processing of TOS / Privacy policy to remove as much irrelevant information as possible from the page.

            # Check the "data-testid" element used in some websites.
            # If find a footer, we can conclude no more useful information exists beyond this, and exit early.
            pattern = r'data-testid="([^"]*)"'
            match = re.search(pattern, str_element)
            if match:
                data_test_id = match.group(1)
                if "footer" in data_test_id:
                    break

            # Check if element has a href element. If it does, conclude it's not relevant to the terms / privacy policy
            pattern = r'href="([^"]*)"'
            match = re.search(pattern, str_element)
            if match: # go to next element
                continue

            # Extract the CSS class of the element
            pattern = r'class\s*=\s*["\'](.*?)["\']'
            match = re.search(pattern, str_element)
            if match:
                class_value = match.group(1)
                # Try to extract only the most relevant information from page by filtering out CSS elements usually
                # associated with elements not related to the TOS or privacy policy text.
                exclude_keywords = ["head", "footer", "nav", "menu", "overlay", "bottom", "map", "button", "list"]

                # Go to next element if this element has a classname matching the filter list
                if any(keyword in class_value.lower() for keyword in exclude_keywords):
                    continue

            if element.get_text():
                cleaned_text = re.sub(r'\s+', ' ', element.get_text().strip()) # Remove unnecessary space
                if cleaned_text not in unique_content:  # try not to catch things more than once (potentially slow)
                    unique_content.append(cleaned_text)

        unique_content = ' '.join(unique_content)
        return unique_content


# scraper = GenericSiteTosScraper()
# print(scraper.scrape("https://hypixel.net/terms"))
