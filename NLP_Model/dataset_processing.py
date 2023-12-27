import os
import json


# Given the path to a web scraped dataset, turns the dataset into a JSON file, where each row in the JSON file contains
# A privacy policy and its associated summary.
def process_json(folder_path):
    results_list = []

    for folder in os.listdir(folder_path):
        nested_folder_path = os.path.join(folder_path, folder)

        processed_document = process_document(nested_folder_path)

        if "privacy_policy" in processed_document and "summary" in processed_document:
            # append the returned privacy policy and summary to the list of results.
            results_list.append(
                {"summary": processed_document["summary"], "document": processed_document["privacy_policy"]})

    # Write the results list to JSON file.
    with open("dataset.json", 'w') as json_file:
        json.dump(results_list, json_file, indent=2)  # writes to json file "dataset.json"


# Returns an object with the privacy policy and privacy policy summary in the given path.
def process_document(path):
    privacy_policy_data = {}

    # Create paths to privacy policy and privacy policy summary in current directory.
    privacy_policy_path = os.path.join(path, "Privacy_Policy.txt")
    summary_privacy_policy_path = os.path.join(path, "Privacy_Policy_Summary.txt")

    # If paths to the privacy policy and its summary exists.
    if os.path.exists(privacy_policy_path) and os.path.exists(summary_privacy_policy_path):
        with open(privacy_policy_path, 'r', encoding="utf-8") as policy:
            with open(summary_privacy_policy_path, 'r', encoding="utf-8") as summary:
                # write the content of the privacy policy and summary to object
                privacy_policy_data = {
                    "privacy_policy": policy.read().strip(),
                    "summary": summary.read().strip(),
                }

    return privacy_policy_data


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


SCRAPED_DATA_PATH = "../Web_Scraper/scraped_data"
process_json(SCRAPED_DATA_PATH)
