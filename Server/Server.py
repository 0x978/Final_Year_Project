# This is the server which will interact with the Google Chrome Extension in order to summarise text.

# imports
from flask import Flask, request, jsonify

# Init
app = Flask(__name__)  # Create instance of Flask, passing in the name of the file (Server)


@app.route("/summarise", methods=['POST'])  # Defining a route on path "/summarise"
def summarise_input():
    request_input = request.get_json()

    if "document" not in request_input:
        return jsonify({"error:" "Document not received by server."}), 400

    document = request_input["document"]

    summarised_text = summariser(document)

    return jsonify({'summarized_text': summarised_text})


def summariser(text):
    return "test"


if __name__ == '__main__':
    app.run(debug=True)