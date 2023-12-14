import re
import requests
from bs4 import BeautifulSoup
import os
from googlesearch import search


# This class attempts to scrape the Terms of Service from a given website, by name.

class GenericSiteTosScraper:

    def scrape(self, website_name):
        terms_url = self.find_terms_url(website_name)

        if not terms_url:
            return None

        response = requests.get(terms_url)
        response.encoding = 'utf-8'

        if response.status_code != 200:
            print(f'Error ({response.status_code}) with site URL: {terms_url}')
            return None

        soup = BeautifulSoup(response.text, 'html.parser')
        potential_terms_tags = soup.find_all(['p', 'div', 'span', 'article', 'section', 'b', 'ul', 'li'])
        unique_content = []

        for i in potential_terms_tags:  # consider only these elements
            if i.get_text():
                cleaned_text = re.sub(r'\s+', ' ', i.get_text().strip())
                if cleaned_text not in unique_content:  # try not to catch things more than once (potentially slow)
                    unique_content.append(cleaned_text)

        unique_content = ' '.join(unique_content)
        return unique_content

    def find_terms_url(self, website_name):
        website_domain = f'www.{website_name}.com'

        # First try to find terms and conditions from Google Search
        google_result = self.search_for_terms(website_name)
        if google_result:
            return google_result

        # If for any reason Google fails, use this for a fail-safe.
        # Google may restrict IP if making too many requests.
        terms_paths = [
            "/terms", "/terms-and-conditions", "/terms-of-service", "/terms_of_use", "/user-agreement",
            "/user-agreements", "/terms_of_use", "/terms_of_service", "/service-terms", "/terms-of-use",
            "/service-agreement", "/terms_conditions", "/conditions-of-use", "/site-terms", "/legal/terms",
            "/legal/terms-of-service", "T&C",
        ]

        for path in terms_paths:
            url = website_domain + path
            response = requests.get("https://" + website_domain + path)

            if response.status_code == 200:
                return url
        return False

    def search_for_terms(self, website_name):
        try:
            results = search(website_name + "terms and conditions", num_results=1)
            top_result = next(results)
            return top_result
        except StopIteration:
            return False
