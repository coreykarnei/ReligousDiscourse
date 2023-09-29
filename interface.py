from agents import getAgentResponse
import copy

# Set your OpenAI GPT-3 API key here
api_key = "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"
all_agents = ["Jesus", "Buddha", "Muhammad"]

def getUserInput(remaining_agents):
    alias = {
        'b': 'Buddha',
        'j': 'Jesus',
        'm': 'Muhammad'
    }
    allowed_chars = ['j', 'b', 'm']
    have_input = False
    while not have_input:
        imp = input("Choose who may respond: j, b, or m\n")
        if imp in allowed_chars:
            if alias[imp] in remaining_agents:
                return alias[imp]
            else:
                print(f"{alias[imp]} cannot go twice in a row")
        else:
            print(f"Invalid input {imp}")

def singleChatLoop(chat_history, previous_agent):
    remaining_agents = copy.deepcopy(all_agents)
    try:
        remaining_agents.remove(previous_agent)
    except:
        pass

    print("agents are thinking...")
    replies, scores = [], []
    for agent in remaining_agents:
        reply, score = getAgentResponse(api_key, chat_history, agent)
        replies.append(reply)
        scores.append(score)

    for i, agent in enumerate(remaining_agents):
        print(agent, "'s interest in responding: ", end='')
        for j in range(int(scores[i])):
             print("=", end='')
        print("")

    selected_agent = getUserInput(remaining_agents)
    selected_agent_idx = remaining_agents.index(selected_agent)
    print("selected agent:", selected_agent)

    print(replies[selected_agent_idx])
    chat_history.append({"role": "user", "content": replies[selected_agent_idx]})
    return chat_history, selected_agent

debate_topic = "What is the best moral system?"
print("Debate Topic: " + debate_topic)

chat_history = [
    {"role": "user", "content": "Debate Topi: " + debate_topic},
]
chat_history, currentAgent = singleChatLoop(chat_history, "") 

while(True):
    chat_history, currentAgent = singleChatLoop(chat_history, currentAgent) 