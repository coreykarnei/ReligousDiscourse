import openai

def getAgentResponse(api_key, chat_history, agentName, RETRY=5):
    # Set the system message
    system_messages = {
        "Jesus": "[Write your next reply from the point of view of Jesus Christ and only Jesus. Write 1 reply only in internet RP style from the point of view of Jesus Christ having a friendly debate with his friends. Write a measured and thoughtful response that directly addresses the message of the most recent speaker. Write a score on a scale from 1 tp 5 indicating how strongly Jesus Christ wants to be the nest person to reply. Write your reply in the following format:\nJesus: message goes here\n[Desire to respond]: 3",
        "Buddha": "[Write your next reply from the point of view of The Buddha and only Buddha. Write 1 reply only in internet RP style from the point of view of The Buddha having a friendly debate with his friends. Write a measured and thoughtful response that directly addresses the message of the most recent speaker. Write a score on a scale from 1 tp 5 indicating how strongly the Buddha wants to be the nest person to reply. Write your reply in the following format:\nBuddha: message goes here\n[Desire to respond]: 3"
    }

    # Initialize the OpenAI API client
    openai.api_key = api_key

    chat_history.insert(0, {"role": "system", "content": system_messages[agentName]})

    # print(chat_history)

    # Make a request to the OpenAI API with the chat history
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=chat_history
    )

    # Extract and print the assistant’s reply from the response
    assistant_reply = response['choices'][0]['message']['content']
    if assistant_reply[0:5] != agentName and isinstance(assistant_reply[-1], int):
        if RETRY > 0:
            assistant_reply = getAgentResponse(api_key, chat_history, agentName, RETRY-1)
        else:
            return "ERROR IN RESPONSE\n", assistant_reply

    return assistant_reply[:-23], assistant_reply[-1]