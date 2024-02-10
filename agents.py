import openai
import copy

def getAgentResponse(api_key, chat_history, agentName, debug=False, RETRY=5):
    print(f"Getting {agentName}'s response...")
    # Set the system message
    system_messages = {
        "Jesus": "[Write your next reply from the point of view of Jesus Christ and only Jesus. Write 1 reply only in internet RP style from the point of view of Jesus Christ having a friendly debate about who's religious philosphy is correct. Debaters who use too many words are HEAVILY penalized. Write a response that directly addresses the message of the most recent speaker. Write a score on a scale from 1 tp 5 indicating how strongly Jesus Christ wants to be allowed to reply next. Write your reply in the following format always begin with your name and end with your score:\n\n###\nJesus: message 4 sentences or less goes here\nDesire to respond: 3",
        "Buddha": "[Write your next reply from the point of view of The Buddha and only Buddha. Write 1 reply only in internet RP style from the point of view of The Buddha having a friendly debate about who's religious philosphy is correct. Debaters who use too many words are HEAVILY penalized. Write a response that directly addresses the message of the most recent speaker. Write a score on a scale from 1 tp 5 indicating how strongly the Buddha wants to be allowed to reply next. Write your reply in the following format always begin with your name and end with your score:\n\n###\nBuddha: message 4 sentences or less goes here\nDesire to respond: 3",
        "Muhammad": "[Write your next reply from the point of view of Muhammad and only Muhammad. Write 1 reply only in internet RP style from the point of view of Muhammad having a friendly debate about who's religious philosphy is correct. Debaters who use too many words are HEAVILY penalized. Write a response that directly addresses the message of the most recent speaker. Write a score on a scale from 1 tp 5 indicating how strongly Muhammad wants to be allowed to reply next. Write your reply in the following format, always begin with your name and end with your score:\n\n###\nMuhammad: message 4 sentences or less goes here\nDesire to respond: 3"
    }

    # Initialize the OpenAI API client
    openai.api_key = api_key

    tmp_chat_history = copy.deepcopy(chat_history)
    tmp_chat_history.insert(0, {"role": "system", "content": system_messages[agentName]})

    # if debug: print(chat_history)

    # Make a request to the OpenAI API with the chat history
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=tmp_chat_history
        )
    except Exception as e:
        print("exception occured while hitting the API")
        if debug: print(tmp_chat_history)
        if debug: print(e)
        response = {'choices': [{'message': {'content': "ffffffffffffffffffffffffff"}}]}


    # Extract and print the assistant’s reply from the response
    assistant_reply = response['choices'][0]['message']['content']
    parsedName = assistant_reply[0:len(agentName)]
    agentScore = assistant_reply[-1]
    if parsedName != agentName or not agentScore.isnumeric():
        if RETRY > 0:
            print("query failed; retrying..")
            # if debug: print(f"Failed response: {assistant_reply}")
            if debug: print(f"Is {assistant_reply[0:5]} == {agentName}?")
            if debug: print(f"Is {assistant_reply[-1]} a numeric?")
            assistant_reply = getAgentResponse(api_key, chat_history, agentName, debug, RETRY-1)
        else:
            return "ERROR IN RESPONSE\n", assistant_reply

    if debug: print(assistant_reply[:-21], assistant_reply[-1])
    return assistant_reply[:-21], assistant_reply[-1]