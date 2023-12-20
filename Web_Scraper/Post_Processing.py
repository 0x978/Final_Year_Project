import re
import os

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

    def main(self):
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


processing = PostProcessing()
processing.main()
