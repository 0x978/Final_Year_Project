# This file defines a server responsible for summarising text via the produced model and hugging face pipelines API.
# The summarisation process uses considerable resources, and thus should be run on a powerful server.
# It will use all the RAM available, including up to 32GB.
# Also note the models must be available in the same directory as the server, which are ~1.7 GB each.

from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import LEDTokenizer, LEDForConditionalGeneration, AutoModelForSequenceClassification, \
    AutoTokenizer

app = Flask("Server")  # Creates flask instance called server
CORS(app)  # Enable CORS on server

# Initialise model paths
PRIVACY_POLICY_MODEL_PATH = "NEW_8_epoch_privacy_model"
TERMS_AND_CONDITIONS_MODEL_PATH = "NEW-TOS_Model_4_epoch"
CLASSIFIER_MODEL_PATH = "4_epoch_classifier_model"

# Initialize the models and their tokenisers
privacy_tokeniser = LEDTokenizer.from_pretrained(PRIVACY_POLICY_MODEL_PATH)
privacy_model = LEDForConditionalGeneration.from_pretrained(PRIVACY_POLICY_MODEL_PATH)

terms_tokeniser = LEDTokenizer.from_pretrained(TERMS_AND_CONDITIONS_MODEL_PATH)
terms_model = LEDForConditionalGeneration.from_pretrained(TERMS_AND_CONDITIONS_MODEL_PATH)

classifier_tokeniser = AutoTokenizer.from_pretrained(CLASSIFIER_MODEL_PATH)
classifier_model = AutoModelForSequenceClassification.from_pretrained(CLASSIFIER_MODEL_PATH)


# Route which listens on "/summarise" for incoming text and passes it to function "summarise"
@app.route("/summarise", methods=['POST'])
def summarise_input():
    request_json = request.get_json()
    document = request_json.get('doc')
    document_type = request_json.get('doctype')

    if not document or not document_type:  # If nothing is passed in - or some error occurs in parsing
        return jsonify({"error": "Document not received by the server."}), 400

    # Surround summarisation in try/except to prevent server crash on failure in running models
    try:
        summarised_text = None
        if document_type == "Privacy Policy":
            summarised_text = summariser_privacy(document)
        elif document_type == "Terms and Conditions":
            summarised_text = summariser_tos(document)

        if summarised_text is None:
            return jsonify({'error': "Failed to summarise"}), 500

        classification = classify_summary(summarised_text)

        # Add CORS headers to the response to prevent CORS errors.
        response = jsonify({'summarized_text': summarised_text, "classification": classification})
        response.headers.add('Access-Control-Allow-Origin', '*')

        return response

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Summarises the given text using the produced model and the pipeline API from Hugging Face
def summariser_privacy(text):
    # Tokenise text and Truncate any exceeding 16384 tokens.
    tokenised_text = privacy_tokeniser(text, return_tensors="pt", truncation=True).input_ids
    tokenised_result = privacy_model.generate(tokenised_text)  # Generate summary
    result = privacy_tokeniser.decode(tokenised_result[0], skip_special_tokens=True)  # decode summary to English
    return result


def summariser_tos(text):
    tokenised_text = terms_tokeniser(text, return_tensors="pt", truncation=True).input_ids
    tokenised_result = terms_model.generate(tokenised_text)  # Generate summary
    result = terms_tokeniser.decode(tokenised_result[0], skip_special_tokens=True)  # decode summary to English
    return result


def classify_summary(summary):
    tokenised_summary = classifier_tokeniser(summary, return_tensors="pt", truncation=True)

    # Create probabilities into classifications "positive, "neutral" and "Negative"
    predictions = classifier_model(**tokenised_summary).logits

    # predictions are made for classification groups all the predictions - need to single out highest
    prediction = predictions.argmax().item()

    # When the model was trained, it was given parameters to convert the numerical response to a label
    # i.e. 0 == "negative", 1 == "neutral", 2 == "positive"
    classification = classifier_model.config.id2label[prediction]
    return classification


# Run main
if __name__ == '__main__':
    app.run(debug=True)  # Runs in debug mode as it's running locally and not on a server.
