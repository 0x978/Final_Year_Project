import re
import requests
from bs4 import BeautifulSoup
import time


'''
Scrapes a list of services for which TOSDR has summary points for.
The resulting list is 1695 services long.
Timeouts are used to not flood any website with requests
As a result this takes about 15 minutes to execute
'''

class TOSDRListScraper:
    page_number = 289  # Start page number at 289 - The first page with any useful summaries.

    def scrape(self):
        while self.page_number <= 357:
            TOSDR_URL = f'https://edit.tosdr.org/services?page={self.page_number}&q%5Bs%5D=rating+desc'
            try:
                headers = {
                    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                                  "Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"}
                response = requests.get(TOSDR_URL, headers=headers)
            except:
                return None
            response.encoding = 'utf-8'

            # Handle invalid response from TOSDR.
            if response.status_code != 200:
                print(f'TODR LIST SCRAPER HAS RETURNED ERROR: {response.status_code} EXITING AT PAGE NUMBER: '
                      f'{self.page_number}')
                return None

            # Regex which picks out the URL to a service from the table.
            service_number_regex = re.compile(r'/services/(\d+)"')

            soup = BeautifulSoup(response.text, 'html.parser')
            count = 0  # Count number of services scraped from this page

            table_items = soup.find_all(['tr'])  # create a list of all table rows on webpage

            for item in table_items:
                # Searching for the element containing the URL to the service.
                for child_item in item:
                    formatted_child = re.sub(r'\s+', ' ', str(child_item))  # Removing unnecessary spacing from child

                    # Ignore any services which do not have a rating, and thus, no summaries.
                    if formatted_child == "<td> N/A </td>":  # Uniquely identifies unrated services
                        break

                    if "href=\"/services" in formatted_child:  # If child element has a URL to a service
                        service_number = re.search(service_number_regex, formatted_child)  # extract it,
                        if service_number:  # Then write it to file.
                            self.write_to_file(service_number.group(0))
                            print(f'found service URL: {service_number.group(0)}')
                            count += 1
                            break

            print(f'Fetched {count} pages from {self.page_number} out of 357, '
                  f'waiting 7 seconds and moving to next page.')
            time.sleep(7)  # 7-Second delay, as to not flood any website with requests.
            self.page_number += 1

    def write_to_file(self, href):
        with open("URL_List.txt", "a", encoding="utf-8") as file:
            file.write(f"{href}\n")


scraper = TOSDRListScraper()
scraper.scrape()
