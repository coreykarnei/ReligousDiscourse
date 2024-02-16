import os
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS

application = Flask(__name__)
CORS(application)

openai.api_key = os.environ['OPENAI_ACCESS_KEY']

@application.route("/get-agent-response", methods=["POST"])
def chat():
    data = request.get_json()
    chat_history = data.get("history")
    agent_name = data.get("agentName")  # Now we also get the agent's name from the request'
    latest_message = data.get("latestMessage")
    debate_topic = data.get("debateTopic")

    # Define unique system prompts for each agent
    system_prompts = {
        'Jesus': "[Write your next reply from the point of view of Jesus Christ and only Jesus. Write 1 reply only in internet RP style from the point of view of Jesus Christ having a friendly debate about who's religious philosphy is correct. Debaters who use too many words are HEAVILY penalized. Write a response that directly addresses the message of the most recent speaker. Message must be 6 sentences or less",
        'Buddha': "[Write your next reply from the point of view of The Buddha and only Buddha. Write 1 reply only in internet RP style from the point of view of The Buddha having a friendly debate about who's religious philosphy is correct. Debaters who use too many words are HEAVILY penalized. Write a response that directly addresses the message of the most recent speaker. Message must be 6 sentences or less",
        'Muhammad': "[Write your next reply from the point of view of Muhammad and only Muhammad. Write 1 reply only in internet RP style from the point of view of Muhammad having a friendly debate about who's religious philosphy is correct. Debaters who use too many words are HEAVILY penalized. Write a response that directly addresses the message of the most recent speaker. Message must be 6 sentences or less"
    }

    # Choose the system prompt based on the agent's name
    system_prompt = system_prompts.get(agent_name, "Default system prompt if agent not found")

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": 'user', "content": debate_topic}
    ]
    
    # # Append chat history and user message to messages
    for msg in chat_history:
        msg_author = msg['author']
        messages.append({"role": "user" if (msg_author != agent_name) else "system", "content": f"{msg_author}: {msg['text']}"})

    if latest_message:
        messages.append({"role": "user" if (latest_message['author'] != agent_name) else "system", "content": f"{latest_message['author']}: {latest_message['text']}"})

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=500,
            n=1,
            stop=None,
            temperature=0.8,
        )

        chat_response = response['choices'][0]['message']['content'].strip()

    except Exception as e:
        return jsonify({"error": "Error generating response"}), 500

    if ': ' in chat_response[:15]:
        # Find the position of the first occurrence of ': '
        colon_position = chat_response.find(': ')
        # Update the message to be everything after ': '
        chat_response = chat_response[colon_position + 2:]
    
    return jsonify({"response": chat_response})
    # return jsonify({"response": f"temp message for {agent_name}"})

if __name__ == "__main__":
    application.run(debug=True)
