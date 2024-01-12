import os
import time
import requests
from bs4 import BeautifulSoup, ResultSet
import re


# This class scrapes the rating given by TOSDR for each service.
# It converts this to "Neutral", "positive" or "negative"
# And writes it to the service's location on disk.

class ClassifierScraper:
    overall_start_time = time.time()

    scraped_service_array = os.listdir("scraped_data")
    total_services = len(scraped_service_array)
    count = 0

    def scrape(self):
        with open("URL_List.txt") as file:  # Open URL list scraped by "TOSDR list scraper"
            for line in file:
                time.sleep(1)  # delay to not send too many requests.
                line = line.strip()

                start_time = time.time()

                URL = f'https://edit.tosdr.org{line}'

                data = self.get_service_name_and_rating(URL)

                if data:
                    website_name = data["name"]
                    rating = data["rating"]

                    # if a summary for this service wasn't collected, skip it.
                    if website_name not in self.scraped_service_array:
                        continue
                    # if a summary was collected, convert to ranking and write to disk.
                    else:
                        ranking = self.convert_rating_to_ranking(rating)
                        self.write_ranking_to_service(website_name, ranking)
                        self.count += 1
                        print(f'Wrote {website_name} with rating of {rating} to disk, equivalent to rank: "{ranking}"'
                              f' (current count = {self.count})')

        print(f'Finished scraping ratings for {self.count} out of {self.total_services} in '
              f'{time.time() - self.overall_start_time} seconds')

    # given a url from "URL_List" (scraped by TOSDR_List_Scraper) - returns the service's name and TOS;DR rating.
    def get_service_name_and_rating(self, url):

        # Handle making a request and receiving response.
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
                              ' Chrome/120.0.0.0 Safari/537.36'}
            response = requests.get(url, headers=headers)
        except:
            return None

        # Parsing and reading response
        soup = BeautifulSoup(response.text, 'html.parser')
        text_regex = re.compile(r'(?<=">)(.+?)(?=<)')  # Regular expression extracts text from any html element

        h1_elements = soup.find_all(['h1'])  # get all H1 elements of page.
        website_name = h1_elements[0].text  # the first H1 element has the service name, retrieve its text.

        h5_elements = soup.find_all(['h5'])  # get all H5 elements of page.
        website_rating_text = h5_elements[0].text  # the first H5 element has the service rating, retrieve its text.

        # Rating is scraped in form "Rating: E" - use regex to extract just single char "E", for example.
        pattern = r'Rating: (\w)'
        rate_match = re.search(pattern, website_rating_text)

        if rate_match:
            rating = rate_match.group(1)
            return {
                "name": website_name,
                "rating": rating
            }
        else:
            return None

    # Given a service name and ranking, writes it to the appropriate service's directory on disk.
    def write_ranking_to_service(self, service_name, rating):
        # Directory of service
        service_directory = f'scraped_data/{service_name}'

        # Write to disk the summary at given directory.
        try:
            if os.path.exists(service_directory) and os.path.isdir(service_directory):
                file_path = os.path.join(service_directory, "rating.txt")  # save in file "rating.txt"
                with open(file_path, 'w') as file:
                    file.write(rating)
            else:
                print(f'ERROR: service directory not found for: {service_name}')
                return None
        except OSError as exception:
            print(f"ERROR: {exception}")

    # Given a TOS;DR rating (A,B,C,D,E,F), converts this to "negative, neutral, positive"
    def convert_rating_to_ranking(self, rating):
        if rating in {'E', 'D'}:
            return "negative"
        elif rating == 'C':
            return "neutral"
        elif rating in {'B', 'A'}:
            return "positive"
        else:
            return None


scraper_instance = ClassifierScraper()
scraper_instance.scrape()
