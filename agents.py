import openai

def getAgentResponse(api_key, chat_history, agentName, RETRY=5):
    print("starting get response...")
    # Set the system message
    system_messages = {
        "Jesus": "[Write your next reply from the point of view of Jesus Christ and only Jesus. Write 1 reply only in internet RP style from the point of view of Jesus Christ having a friendly debate with his friends. Write a measured and thoughtful response that directly addresses the message of the most recent speaker. Write a score on a scale from 1 tp 5 indicating how strongly Jesus Christ wants to be allowed to reply next. Write your reply in the following format:\nJesus: message goes here\nDesire to respond: 3",
        "Buddha": "[Write your next reply from the point of view of The Buddha and only Buddha. Write 1 reply only in internet RP style from the point of view of The Buddha having a friendly debate with his friends. Write a measured and thoughtful response that directly addresses the message of the most recent speaker. Write a score on a scale from 1 tp 5 indicating how strongly the Buddha wants to be allowed to reply next. Write your reply in the following format:\nBuddha: message goes here\nDesire to respond: 3",
        "Muhammad": "[Write your next reply from the point of view of Muhammad and only Muhammad. Write 1 reply only in internet RP style from the point of view of Muhammad having a friendly debate with his friends. Write a measured and thoughtful response that directly addresses the message of the most recent speaker. Write a score on a scale from 1 tp 5 indicating how strongly Muhammad wants to be allowed to reply next. Write your reply in the following format:\Muhammad: message goes here\nDesire to respond: 3"
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
    agetnNameLength= len(agentName)
    if assistant_reply[0:agetnNameLength] != agentName or not assistant_reply[-1].isnumeric():
        if RETRY > 0:
            print("query failed; retrying..")
            print(assistant_reply[0:5], agentName)
            print(assistant_reply[-1])
            assistant_reply = getAgentResponse(api_key, chat_history, agentName, RETRY-1)
        else:
            return "ERROR IN RESPONSE\n", assistant_reply

    return assistant_reply[:-21], assistant_reply[-1]