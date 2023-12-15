import os
from Generic_site_tos_scraper import GenericSiteTosScraper
from TOSDR_Summary_Scraper import TOSDR_Summary_Scraper
import time
from googlesearch import search


# This class controls all the other scrapers, running them and storing results.

class Controller:
    index = 0  # If the scraper crashes or times out, this will be used to know where it got up to in the list.

    def main(self):
        with open("URL_List.txt") as file:  # Open URL list scraped by "TOSDR list scraper"
            for line in file:
                # Make objects of the other two scrapers.
                generic_site_scraper = GenericSiteTosScraper()
                tosdr_summary_scraper = TOSDR_Summary_Scraper()

                start_time = time.time()
                time.sleep(5)  # sleeping the scraper to not flood any website with requests.

                URL = f'https://edit.tosdr.org{line}'  # Creating URL to document by reading scraped file.
                scraped_summary = tosdr_summary_scraper.scrape_from_url(URL)

                if scraped_summary:
                    time_taken = round(time.time() - start_time)

                    website_name = scraped_summary["Website Name"]
                    terms_URL = scraped_summary["Terms_URL"]
                    privacy_URL = scraped_summary["Privacy_URL"]
                    terms_summaries = scraped_summary["Terms_Summaries"]
                    privacy_summaries = scraped_summary["Privacy_Summaries"]

                    print(f'{website_name}: Scraped {len(terms_summaries)} terms summaries and '
                          f'{len(privacy_summaries)} privacy summaries. Terms URL?: {terms_URL is not None} '
                          f'Privacy URL?: {privacy_URL is not None} | time elapsed: {time_taken} seconds')

                    # If we received terms or privacy policy summary but not their respective URL,
                    # google search for the URL to these documents.
                    if terms_summaries and not terms_URL:
                        terms_URL = self.search_for_document(website_name, type_of_document="Terms and Conditions")
                    if privacy_summaries and not privacy_URL:
                        privacy_URL = self.search_for_document(website_name, type_of_document="Privacy Policy")

                    # If we have terms and conditions summary, and a URL to the actual terms and conditions
                    if terms_summaries and terms_URL:
                        joined_terms_summary = '. '.join(terms_summaries) # Join summary into a paragraph.

                        # Scrapes the TOS of a given website, stored in this variable
                        service_terms = generic_site_scraper.scrape(terms_URL)

                        # If the service terms URL on the website is invalid, look for it as it probably moved.
                        if service_terms is None:
                            terms_URL = self.search_for_document(website_name, type_of_document="Terms and Conditions")
                            service_terms = generic_site_scraper.scrape(terms_URL)
                            print(f'Backup ran, result: {service_terms}')

                        # If successfully found both the full TOS and a summary, write it to disk.
                        if service_terms and joined_terms_summary:
                            self.write_to_file(text=joined_terms_summary, website_name=website_name,
                                               document_type="Terms_Summary")

                            self.write_to_file(text=service_terms, website_name=website_name,
                                               document_type=f'{website_name}_Terms')

                    # If we have privacy policy summary, and a URL to the actual privacy policy
                    if privacy_summaries and privacy_URL:
                        joined_privacy_summary = '. '.join(privacy_summaries)
                        privacy_policy = generic_site_scraper.scrape(privacy_URL)

                        # If the service Privacy Policy URL on the website is invalid, look for it as it probably moved.
                        if privacy_policy is None:
                            privacy_URL = self.search_for_document(website_name, type_of_document="Privacy Policy")
                            privacy_policy = generic_site_scraper.scrape(privacy_URL)

                        # If successfully received a summary and a privacy policy, write them to file
                        if privacy_policy and privacy_summaries:
                            self.write_to_file(text=joined_privacy_summary, website_name=website_name,
                                               document_type="Privacy_Policy_Summary")
                            self.write_to_file(text=privacy_policy, website_name=website_name,
                                               document_type=f'{website_name}_Privacy_Policy')

                # If something went wrong with receiving a scraped summary, wait 30 seconds and move to next service
                else:
                    print(f'ERROR: Scraped summary not retrieved for {line}')
                    time.sleep(30)

    # Writes the given text to file.
    # Places in a directory named after the website the text comes from.
    # Names the text file whatever is passed in the "document_type" parameter
    def write_to_file(self, text, website_name, document_type):
        os.makedirs('scraped_data', exist_ok=True)
        directory_path = "scraped_data/" + website_name
        os.makedirs(directory_path, exist_ok=True)

        file_path = os.path.join(directory_path, f'{document_type}.txt')

        with open(file_path, 'a', newline='', encoding='utf-8') as textfile:
            textfile.write(f"{text}")

    # Given a website name and the type of document to look for, returns the URL to this document.
    def search_for_document(self, website_name, type_of_document):
        try:
            results = search(f'{website_name} {type_of_document}', num_results=1)
            top_result = next(results)
            return top_result
        except StopIteration:
            return False


test = Controller()
test.main()
