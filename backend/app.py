from flask import Flask, request, jsonify
from flask_cors import CORS
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from pymongo import MongoClient
import datetime


# Replace with your connection string
MONGO_URI = "mongodb+srv://sasfitness2002:<db_password>@cluster0.cpvdopf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["chatbotdb"]
chat_collection = db["messages"]

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

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")

    # Get bot response
    bot_response = chatbot.get_response(user_message)
    bot_text = str(bot_response)

    # Save to MongoDB
    chat_collection.insert_one({
        "timestamp": datetime.datetime.utcnow(),
        "user": user_message,
        "bot": bot_text
    })

    return jsonify({"response": bot_text})

