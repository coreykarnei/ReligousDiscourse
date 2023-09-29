from agents import getAgentResponse
import copy

# Set your OpenAI GPT-3 API key here
api_key = "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"
all_agents = ["Jesus", "Buddha"]


def single_chat_loop(chat_history, current_agent):
    remaining_agents = copy.deepcopy(all_agents)
    remaining_agents.remove(current_agent)

    print("thinking...")
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

    selected_agent = remaining_agents[0]
    selected_agent_idx = 0
    print(selected_agent + ": " + replies[selected_agent_idx])
    chat_history.append({"role": "user", "content": selected_agent + ": " + replies[selected_agent_idx]})
    return chat_history

chat_history = [
    {"role": "user", "content": "Debate Topic: What is the meaning of life?"},
    {"role": "user", "content": "Budda: It is to minimize suffering, as I have taught."}
]

currentAgent = "Buddha"
chat_history = single_chat_loop(chat_history, currentAgent) 