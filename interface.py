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
        userInput = input("Choose who may respond: j, b, or m\n")
        if userInput in allowed_chars:
            selectedAgent = alias[userInput]
            if selectedAgent in remaining_agents:
                return selectedAgent
            else:
                print(f"{selectedAgent} cannot go twice in a row")
        else:
            print(f"Invalid input {userInput}")

def singleChatLoop(chat_history, previous_agent, debug=False):

    remaining_agents = generateRemainingAgentsList(previous_agent)
    print(f"remaining agents: {remaining_agents}, previous agent: {previous_agent}")

    print("Agents are thinking...")
    if debug: print(chat_history)
    replies, scores = [], []
    for agent in remaining_agents:
        temp_chat_history = copy.deepcopy(chat_history)
        reply, score = getAgentResponse(api_key, temp_chat_history, agent, debug)
        replies.append(reply), scores.append(score)
        if debug: print(f"{agent}'s reply: {reply}")

    printAgentDesireScores(remaining_agents, scores, debug)

    selected_agent = getUserInput(remaining_agents)
    selected_agent_idx = remaining_agents.index(selected_agent)
    if debug: print("Selected agent:", selected_agent)

    print(replies[selected_agent_idx])
    chat_history.append({"role": "user", "content": replies[selected_agent_idx]})
    return chat_history, selected_agent

def printAgentDesireScores(remaining_agents, scores, debug=False):
    for i, agent in enumerate(remaining_agents):
        print(agent, "'s interest in responding: ", end='')
        for j in range(int(scores[i])):
             print("=", end='')
        print("")

def generateRemainingAgentsList(previous_agent):
    remaining_agents = copy.deepcopy(all_agents)
    try:
        remaining_agents.remove(previous_agent)
    except Exception as e:
        print(f"Failed to remove agent {previous_agent}")
        print(e)
        pass
    return remaining_agents

debate_topic = "What is the afterlife like?"
print("Debate Topic: " + debate_topic)

chat_history = [
    {"role": "user", "content": "Debate Topic: " + debate_topic},
]
chat_history, currentAgent = singleChatLoop(chat_history, "") 

while(True):
    chat_history, currentAgent = singleChatLoop(chat_history, currentAgent, debug=False) 