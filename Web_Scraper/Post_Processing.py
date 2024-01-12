import re
import os
import statistics

''' 
Some documents scraped from services (terms / privacy policy) get incorrectly scraped, for example, the 
services' 404 page text might get scraped, or some other site information may be scraped not relevant to the documents.

Although the scraper has 95%+ accuracy on scraping TOS and Privacy Policy successfully, any problematic documents 
could have an adverse affect on the training of the model.

Terms and Privacy Policies are usually lengthy documents, therefore this script displays as sorted list of 
the length of each scraped privacy policy / terms and conditions, such that the ones of noticeably short length
 can be manually checked, and updated if necessary.
'''


class PostProcessing:

    def displayCounts(self):
        paths = []
        for root, dirs, files in os.walk("scraped_data"):
            for file in files:
                if file.endswith(".txt"):
                    file_path = os.path.join(root, file)
                    str_file_path = str(file_path)

                    if not str_file_path.endswith("Summary.txt"):
                        file_size = os.path.getsize(file_path)

                        pattern = re.compile(r"scraped_data\\([^\\]+)\\((Privacy_Policy|Terms)(_Summary)?)\.txt$")
                        match = pattern.search(str_file_path)
                        if match:
                            service_name = match.group(1)
                            document_type = match.group(2)
                            paths.append([f'{service_name} ({document_type})', file_size])

        sorted_paths = sorted(paths, key=lambda path: path[1])
        for line in sorted_paths:
            print(line)

    def display_data_metrics(self):
        privacy_policy_count = 0
        privacy_policy_cumulative_length = 0
        privacy_policy_max = 0
        privacy_policy_min = float('inf')
        privacy_len_array = []

        terms_and_conditions_count = 0
        tos_cumulative_length = 0
        tos_max = 0
        tos_min = float('inf')
        tos_len_array = []

        privacy_summary_count = 0
        terms_summary_count = 0


        for root, dirs, files in os.walk("scraped_data"):
            for file in files:
                if file.endswith(".txt"):
                    file_path = os.path.join(root, file)

                    if "Privacy_Policy.txt" == file:
                        privacy_policy_count += 1

                        with open(file_path, 'r', encoding='utf-8') as privacy_policy:
                            privacy_policy_content = privacy_policy.read()
                            privacy_policy_length = len(privacy_policy_content)
                            privacy_policy_cumulative_length += privacy_policy_length
                            privacy_len_array.append(privacy_policy_length)

                            if privacy_policy_length > privacy_policy_max:
                                privacy_policy_max = privacy_policy_length

                            if privacy_policy_length < privacy_policy_min:
                                privacy_policy_min = privacy_policy_length

                    if "Terms.txt" == file:
                        terms_and_conditions_count += 1
                        with open(file_path, 'r', encoding='utf-8') as terms:
                            terms_content = terms.read()
                            terms_len = len(terms_content)
                            tos_cumulative_length += terms_len
                            tos_len_array.append(terms_len)

                            if terms_len > tos_max:
                                tos_max = terms_len

                            if tos_min > terms_len:
                                tos_min = terms_len

                    if "Privacy_Policy_Summary.txt" == file:
                        privacy_summary_count += 1

                    if "Terms_Summary.txt" == file:
                        terms_summary_count += 1

        avg_privacy_policy_length = round( privacy_policy_cumulative_length / privacy_policy_count)
        avg_tos_length = round(tos_cumulative_length / terms_and_conditions_count)

        median_privacy_length = round(statistics.median(privacy_len_array))
        median_tos_length = round(statistics.median(tos_len_array))

        print(f'Collected: \n'
              f'{privacy_policy_count} Privacy Policy documents and {privacy_summary_count} accompanying summaries. \n'
              f'The average length of a privacy policy document was {avg_privacy_policy_length} characters \n'
              f'The median length of a privacy policy document was {median_privacy_length} characters \n'
              f'The largest privacy policy document was {privacy_policy_max} characters \n'
              f'The smallest privacy policy document was {privacy_policy_min} characters \n'
              
              f'\n'
              
              f'{terms_and_conditions_count} Terms and Conditions and {terms_summary_count} accompanying summaries \n'
              f'The average length of a terms and conditions document was {avg_tos_length} characters \n'
              f'The median length of a terms and conditions document was {median_tos_length} characters \n'
              f'The largest terms and conditions document was {tos_max} characters \n'
              f'The smallest terms and conditions document was {tos_min} characters \n'
              )


post_processing_instance = PostProcessing()
post_processing_instance.display_data_metrics()
