# This file defines a server responsible for summarising text via the produced model and hugging face pipelines API.
# The summarisation process uses considerable resources, and thus should be run on a powerful server.
# It will use all the RAM available, including up to 32GB.
# Also note the models must be available in the same directory as the server, which are ~1.7 GB each.

from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline, LEDTokenizer, LEDForConditionalGeneration

app = Flask("Server")  # Creates flask instance called server
CORS(app)  # Enable CORS on server

# Initialize the model
trained_tokeniser = LEDTokenizer.from_pretrained("Privacy_Policy_Model_4_epoch")
trained_model = LEDForConditionalGeneration.from_pretrained("Privacy_Policy_Model_4_epoch")
summarizer = pipeline("summarization", model=trained_model, tokenizer=trained_tokeniser)


# Route which listens on "/summarise" for incoming text and passes it to function "summarise"
@app.route("/summarise", methods=['POST'])
def summarise_input():
    document = request.data.decode("utf-8")  # Data is passed as utf-8 formatted text (for now)

    if not document:  # If nothing is passed in - or some error occurs in parsing
        return jsonify({"error": "Document not received by the server."}), 400

    # Surround summarisation in try/except to prevent server crash on failure in hugging-face Transformers pipeline
    try:
        summarised_text = summariser(document)

        # Add CORS headers to the response to prevent CORS errors.
        response = jsonify({'summarized_text': summarised_text})
        response.headers.add('Access-Control-Allow-Origin', '*')

        return response

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Summarises the given text using the produced model and the pipeline API from Hugging Face
def summariser(text):
    # Tokenise text and Truncate any exceeding 16384 tokens.
    tokenised_text = trained_tokeniser(text, return_tensors="pt", truncation=True).input_ids
    tokenised_result = trained_model.generate(tokenised_text)  # Generate summary
    result = trained_tokeniser.decode(tokenised_result[0], skip_special_tokens=True)  # decode summary to English
    return result


# Run main
if __name__ == '__main__':
    app.run(debug=True)  # Runs in debug mode as it's running locally and not on a server.
