![PolicyPalLogo](https://github.com/0x978/PolicyPal/assets/97891715/354c019b-e0fe-4c29-87ce-bac6c16f477c)

# What is PolicyPal?
PolicyPal aims to revolutionise the way you interact with website policies, utilising artificial intelligence
to simplify the often convoluted, verbose terms and conditions or privacy policies of any website into a set of 
succinct and concise bullet points using Natural Language Processing (NLP).

# How does it work?
It utilises two custom-trained natural language processing models based on the 
[Longformer Encoder Decoder Architecture by Beltagy et al](https://arxiv.org/pdf/2004.05150) which was trained through transfer learning
using [Hugging Face](https://huggingface.co/) on the task of summarising terms and conditions and privacy policies.

Produced summaries are then passed to a custom fine-tuned [BERT](https://huggingface.co/distilbert/distilbert-base-uncased-finetuned-sst-2-english)
model which will then provide each produced summary with a rating, depending on the degree to which the terms and conditions or privacy policy respects your privacy

# How do I install PolicyPal?
Currently, the only method is to clone the project and compile it as approval has not been sought from the Google Chrome Store
(Or check the releases tab).

Furthermore, the server has been closed due to high cost ($45/m) but it's capable of running locally as long as
you have decent hardware.
# How did the models perform?
Overall, the models show major improvements in the field of summarisation of terms and conditions and privacy policies compared to 
existing models:

### Summarisation Models
These models were evaluated on the [ROUGE Metric (Lin, 2003)](https://aclanthology.org/N03-1020.pdf)
#### Terms And Conditions Model
![image](https://github.com/0x978/PolicyPal/assets/97891715/9682a0e7-1317-4104-8e2a-ab7852113c10)

#### Privacy Policy Model
![image](https://github.com/0x978/PolicyPal/assets/97891715/2e595df0-4b81-468e-8b8e-21660620a949)

### Classification Model
The classificaiton model is evaluated with [Precision and Recall](https://en.wikipedia.org/wiki/Precision_and_recall)
![image](https://github.com/0x978/PolicyPal/assets/97891715/f20f5bb0-40e9-4d58-8661-a460568688d1)

## User evaluation
PolicyPal was evaluated by 30 participants, with all participants inclined to continue using PolicyPal and all participants 
stating they felt more informed while using PolicyPal than when without.

Some further highlights include:
![image](https://github.com/0x978/PolicyPal/assets/97891715/7eac4f08-56f2-4606-980e-265c0ee00a11)

![image](https://github.com/0x978/PolicyPal/assets/97891715/f2ef7919-c815-41ce-97cc-2a21b2ac345e)

![image](https://github.com/0x978/PolicyPal/assets/97891715/f5c8e6ec-7522-4c3b-b8e1-cd1ed2b498c3)

