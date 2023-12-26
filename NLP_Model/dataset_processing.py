import os
import json


def process_json(folder_path):
    result = {}

    for folder in os.listdir(folder_path):
        nested_folder_path = os.path.join(folder_path,folder)


        result[folder] = process_document(nested_folder_path)


        with open("dataset.json",'w',encoding="utf-8") as json_file:
            json.dump(result,json_file)


def process_document(path):
    privacy_policy_data = {}
    privacy_policy_path = os.path.join(path,"Privacy_Policy.txt")
    summary_privacy_policy_path = os.path.join(path,"Privacy_Policy_Summary.txt")

    if os.path.exists(privacy_policy_path) and os.path.exists(summary_privacy_policy_path):
        with open(privacy_policy_path,'r',encoding="utf-8") as policy:
            with open(summary_privacy_policy_path,'r',encoding="utf-8") as summary:
                privacy_policy_data = {
                    "privacy_policy":policy.read().strip(),
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
