import re
import requests
from bs4 import BeautifulSoup
import os

def scrape(url):
    # Get the webpage data from URL
    response = requests.get(url)
    response.encoding = 'utf-8'

    # If the server doesn't respond with "OK", return error
    if response.status_code != 200:
        print("ERROR")
        return

    # Defining regex pattern to pick out the right text on the page
    terms_pattern = re.compile(r'\b(?:terms|term)\b', flags=re.IGNORECASE)

    # Parse with BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')

    potential_terms_tags = soup.find_all(['p', 'div', 'span', 'article', 'section', 'b', 'ul', 'li'])
    relevant_elements = soup.find_all(lambda tag: tag.name and terms_pattern.search(tag.get_text()))

    unique_content = []

    for i in potential_terms_tags:
        if i.get_text() and terms_pattern.search(i.get_text()):
            cleaned_text = re.sub(r'\s+', ' ', i.get_text().strip())
            if cleaned_text not in unique_content:
                unique_content.append(cleaned_text)

    unique_content = ' '.join(unique_content)
    print(len(unique_content))
    write_to_text(url, unique_content)

def write_to_text(url, content):
    site_pattern = re.compile(r'(?m)http(?:s?):\/\/.*?([^\.\/]+?\.[^\.]+?)(?:\/|$)', flags=re.IGNORECASE)

    website_name = site_pattern.search(url).group(1).split(".")[0]
    tos_directory = 'TOS'

    os.makedirs(tos_directory, exist_ok=True)

    file_path = os.path.join(tos_directory, f'{website_name}.txt')

    with open(file_path, 'a', newline='', encoding='utf-8') as textfile:
        textfile.write(f"{content}")


output_csv_file = 'terms_and_conditions.csv'
#scrape("https://help.instagram.com/581066165581870")

URLs = open("URLS.txt", "r").readlines()
for i in URLs:
    scrape(i.strip() + "/terms")
