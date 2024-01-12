import re
import requests
from bs4 import BeautifulSoup
import os

'''
This class scrapes the Terms of Service or Privacy Policy data from a given page URL.
It attempts to remove any irrelevant information, but due to the diversity of different websites, is imperfect
Thus, the produced TOS and Privacy policy might include some irrelevant information from the website.
If an error occurs accessing this, it returns "None"
'''


class GenericSiteTosScraper:

    def scrape(self, URL):

        if not URL:
            return None

        try:
            headers = {
                'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                              "Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"}
            response = requests.get(URL, headers=headers)
        except:
            return None

        response.encoding = 'utf-8'

        # If the website gives an invalid response code, return None.
        if response.status_code != 200:
            print(f'Error ({response.status_code}) with site URL: {URL}')
            return None

        soup = BeautifulSoup(response.text, 'html.parser')

        # find the potential tags which might contain the terms and conditions data.
        # These are tags which usually contain long text
        potential_terms_tags = soup.find_all(['p', 'div', 'span', 'article', 'section', 'b', 'ul', 'li', 'ol',
                                              'strong', 'em', 'blockquote','br','h1','h2','h3','h4','h5','u',
                                              'section'])
        unique_content = []  # Will be updated to hold any information not yet scraped on this site.

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

            # Extract the CSS class of the element
            pattern = r'class\s*=\s*["\'](.*?)["\']'
            match = re.search(pattern, str_element)



            if match:
                class_value = match.group(1)

                # If find a footer, we can conclude no more useful information exists beyond this, and exit early.
                if "footer" in class_value.lower():
                    break

                # Try to extract only the most relevant information from page by filtering out CSS elements usually
                # associated with elements not related to the TOS or privacy policy text.
                exclude_keywords = ["head", "footer", "nav", "menu", "overlay", "bottom", "map", "button"]

                # Go to next element if this element has a classname matching the filter list
                if any(keyword in class_value.lower() for keyword in exclude_keywords):
                    continue

            # Extracting element text from element WITHOUT also extracting from its children.
            # For some reason `element.get_text()` also extracts text from an elements children.
            # The workaround for this is sourced from the below
            # https://stackoverflow.com/questions/4995116/only-extracting-text-from-this-element-not-its-children
            element_text = s = "".join(element.find_all(string=True, recursive=False))

            if element_text:
                cleaned_text = re.sub(r'\s+', ' ', element_text.strip())  # Remove unnecessary space
                if cleaned_text not in unique_content:  # try not to catch things more than once (potentially slow)
                    unique_content.append(cleaned_text)

        unique_content = ' '.join(unique_content)
        return unique_content

# scraper = GenericSiteTosScraper()
# print(scraper.scrape("https://bitly.com/pages/privacy"))
