import os
from Generic_site_tos_scraper import GenericSiteTosScraper
from TOSDR_Summary_Scraper import TOSDR_Summary_Scraper
import time

# This class controls all the other scrapers, running them and storing results.

class Controller:

    index = 0; # If the scraper crashes or times out, this will be used to know where it got up to in the list.

    def main(self):
        generic_site_scraper = GenericSiteTosScraper()
        tosdr_summary_scraper = TOSDR_Summary_Scraper()

        with open("URL_List.txt") as file: # Open URL list scraped by "TOSDR list scraper"
            for line in file:

                time.sleep(5) # sleeping the scraper to not flood any website with requests.
                URL = f'https://edit.tosdr.org/{line}' # Creating URL to document by reading scraped file.

                # Fetching the summary from the URL using the TOSDR Summary Scraper
                # This returns an array, so the array is split into the two respective variables.
                summary_data = tosdr_summary_scraper.scrape_from_url(URL)
                website_name = summary_data[0]
                TOS_summary = summary_data[1]

                # If no TOS summary exists for this site, skip it.
                if TOS_summary is None:
                    print(f'No summary exists for the TOS of {website_name}, skipping.')
                    continue

                # Turning summary array into a legible paragraph by combining it and adding full stops.
                joined_summary = '. '.join(TOS_summary)

                # Grab the TOS for the current website via the "Generic Site Scraper"
                Website_TOS = generic_site_scraper.scrape(website_name)

                # If no website TOS, skip.
                if Website_TOS is None:
                    print(f'Terms and conditions scraper failure for: {website_name}, skipping')
                    continue

                # If code reaches this far, we have the terms and conditions and a set of summaries, write them to disk.
                self.write_to_file(joined_summary, website_name, True)
                self.write_to_file(Website_TOS, website_name, False)


    def write_to_file(self, text, website_name, isSummary):
        directory_path = "TOS/" + website_name
        os.makedirs('TOS', exist_ok=True)
        os.makedirs(directory_path, exist_ok=True)

        file_path = os.path.join(directory_path, f'Summary_{website_name}.txt') if isSummary else\
            os.path.join(directory_path, f'Terms_{website_name}.txt')

        with open(file_path, 'a', newline='', encoding='utf-8') as textfile:
            textfile.write(f"{text}")



test = Controller()
test.main()