from flask import Flask, request, jsonify
from flask_cors import CORS
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from pymongo import MongoClient
from bson import json_util
import json
import datetime

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Connect to MongoDB
MONGO_URI = "mongodb+srv://sasfitness2002:pass%401234@cluster0.cpvdopf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["chatbotdb"]
chat_collection = db["messages"]

# Initialize and train chatbot
chatbot = ChatBot("ReactBot")
trainer = ChatterBotCorpusTrainer(chatbot)
trainer.train(
    "chatterbot.corpus.english",     # General English training
    "./data/custom.yml"              # Your custom training file
)

# Route to handle chat and store messages
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")

    bot_response = chatbot.get_response(user_message)
    bot_text = str(bot_response)

    # Store to MongoDB
    chat_collection.insert_one({
        "timestamp": datetime.datetime.utcnow(),
        "user": user_message,
        "bot": bot_text
    })

    return jsonify({"response": bot_text})

# Route to fetch all messages (for admin dashboard)
@app.route("/messages", methods=["GET"])
def get_messages():
    messages = list(chat_collection.find().sort("timestamp", -1))
    return json.loads(json_util.dumps(messages))

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
