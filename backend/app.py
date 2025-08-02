from flask import Flask, request, jsonify
from flask_cors import CORS
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

app = Flask(__name__)
CORS(app)

chatbot = ChatBot("ReactBot")
trainer = ChatterBotCorpusTrainer(chatbot)
trainer.train(
    "chatterbot.corpus.english",          # (optional) keep general knowledge
    "./data/custom.yml"                   # path to your file
)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message")
    response = chatbot.get_response(message)
    return jsonify({"response": str(response)})

if __name__ == "__main__":
    app.run(debug=True)
