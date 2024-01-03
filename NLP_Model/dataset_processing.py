import os
import json


# Given the path to a web scraped dataset, turns the dataset into a JSON file, where each row in the JSON file contains
# A privacy policy and its associated summary.
def process_json(folder_path, document):
    with open(f"{document}_dataset.jsonl", 'w') as jsonl_data:
        for folder in os.listdir(folder_path):
            nested_folder_path = os.path.join(folder_path, folder)
            processed_document = process_document(nested_folder_path, document)

            if "document" in processed_document and "summary" in processed_document:
                # Writing in JSONL format for better compatibility with Kaggle.
                # This is almost identical to JSON but uses new lines as a delimiter; kaggle disagrees my JSON format.
                jsonl_data.write(json.dumps(
                    {"summary": processed_document["summary"], "document": processed_document["document"]}) + '\n')


# Returns an object with the document, and it's associated summary in an object
def process_document(path, document):
    data = {}

    # Create paths to document and document summary in current directory.
    document_path = os.path.join(path, f'{document}.txt')
    summary_document_path = os.path.join(path, f'{document}_Summary.txt')

    # If paths to the privacy policy and its summary exists.
    if os.path.exists(document_path) and os.path.exists(summary_document_path):
        with open(document_path, 'r', encoding="utf-8") as curr_doc:
            with open(summary_document_path, 'r', encoding="utf-8") as summary:
                # write the content of the privacy policy and summary to object
                data = {
                    "document": curr_doc.read().strip(),
                    "summary": summary.read().strip(),
                }

    return data


# Returns number of Terms & Conditions and number of privacy policies in dataset
def count(folder_path):
    terms_count = 0
    privacy_count = 0
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if "Terms.txt" == str(file):
                terms_count += 1
            if "Privacy_Policy.txt" == str(file):
                privacy_count += 1

    print(f'{terms_count} terms and {privacy_count} privacy policies')


# Joins multiple JSON into one
def json_merger(merged_file, *jsons): # Asterisk in param means we can pass in any number of input json.
    with open(merged_file, 'w') as out_file:
        for curr_json in jsons:
            with open(curr_json, 'r') as in_json:
                for line in in_json:
                    out_file.write(line)


SCRAPED_DATA_PATH = "../Web_Scraper/scraped_data"
#process_json(SCRAPED_DATA_PATH, "Privacy_Policy")
json_merger("Merged_Dataset.jsonl","Privacy_Policy_dataset.jsonl","Terms_dataset.jsonl")