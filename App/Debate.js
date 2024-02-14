import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Keyboard, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AgentView from './AgentView';

const Debate = ({ navigation, route }) => {
  const [userInput, setUserInput] = useState('');
  const [partialResponse, setPartialResponse] = useState('');
  const [agentIsTyping, setAgentIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const scrollViewRef = React.useRef(null);
  const [isUserTouching, setIsUserTouching] = useState(false);
  const debateTopicRef = useRef(null);
  const [dynamicPadding, setDynamicPadding] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [agents, setAgents] = useState([
    {
      agentName: 'Jesus',
      nextMessage: 'next message here...',
      currentSpeaker: false,
      thinking: true,
      buttonClickable: false,
      displayPartialMessage: false,
      partialMaxLength: 40,
    },
    {
      agentName: 'Buddha',
      nextMessage: 'next message here...',
      currentSpeaker: false,
      thinking: true,
      buttonClickable: false,
      displayPartialMessage: false,
      partialMaxLength: 37,
    },
    {
      agentName: 'Muhammad',
      nextMessage: 'next message here...',
      currentSpeaker: false,
      thinking: true,
      buttonClickable: false,
      displayPartialMessage: false,
      partialMaxLength: 32,
    }
  ]);

  useEffect(() => {
    // This code will run once when the component mounts
    agents.forEach(agent => fetchAgentResponse(agent));
  }, []); // The empty array ensures this effect runs only once on mount
  
  // keep scrolling to the bottom while output is being typed
  useEffect(() => {
    if (scrollViewRef.current && !isUserTouching && agentIsTyping && isAtBottom) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: false });
      }, 0); // Adjusted delay for smoother animation
    }
  }, [chatMessages, partialResponse, isUserTouching, agentIsTyping, isAtBottom]);


  const DebateTopic = ({ message }) => {
    return <Text style={styles.debateTopic}>{message}</Text>;
  };

  const fetchAgentResponse = async (agent) => {
    // Placeholder for your API endpoint and request logic
    // const response = await axios.post('YOUR_API_ENDPOINT', { agentName: agent.agentName, message: userInput, history: chatMessages });
    // Simulating a response delay and updating the agent state

    setTimeout(() => {
      const mockResponse = `Mock response for ${agent.agentName}. This message is long to test how the partial message displaying works.`; // Replace with response.data.nextMessage or similar
      setAgents(prevAgents => prevAgents.map(a => 
        a.agentName === agent.agentName ? { ...a, nextMessage: mockResponse, thinking: false, buttonClickable: true, displayPartialMessage: true} : a
      ));
    }, Math.random() * 3000 + 3000); // Simulate variable network delay
  };

  const handleUserMessage = async () => {
    try {
      Keyboard.dismiss();
      if (userInput.trim() !== '') {
        setAgentIsTyping(true);
        setChatMessages([...chatMessages, { text: userInput, author: 'user' }]);
        scrollViewRef.current.scrollToEnd({ animated: false });
        setAgentIsTyping(false);
        setUserInput('');
        setAgentIsTyping(false);
        // Set all agents to thinking
        const updatedAgents = agents.map(agent => ({ ...agent, thinking: true, buttonClickable: false, currentSpeaker: false}));
        setAgents(updatedAgents);

        // Fetch new messages for each agent
        agents.forEach(agent => fetchAgentResponse(agent));
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handleAgentMessage = async (currentAgent) => {
    setAgentIsTyping(true);

    const updatedAgents = agents.map(agent => {
      if (agent.agentName === currentAgent.agentName) {
        // Set currentSpeaker flag to true for the current agent
        return { ...agent, currentSpeaker: true, buttonClickable: false };
      } else {
        return { ...agent, currentSpeaker: false, thinking: true, buttonClickable: false };
      }
    });
    setAgents(updatedAgents);

    updatedAgents.filter(agent => agent.agentName !== currentAgent.agentName)
      .forEach(agent => fetchAgentResponse(agent));

    scrollViewRef.current.scrollToEnd({ animated: false });
    const message = currentAgent.nextMessage;
    for (let i = 1; i <= message.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2)); // Adjust delay as needed
      setPartialResponse(message.slice(0, i));
    }

    setChatMessages((prevMessages) => [
      ...prevMessages,
      { text: message, author: currentAgent.agentName },
    ]);

    setPartialResponse('');
    setAgentIsTyping(false);
  };

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isCloseToBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20; // 20 is a threshold
    setIsAtBottom(isCloseToBottom);
  };

  const getMessageToShow = (msg, isTyping) => {
    if (isTyping) {
      return msg.author + ": " + partialResponse; // Assume partialResponse is relevant to the current typing agent
    }
    return msg.author + ": " + msg.text;
  };


  const currentTypingAgent = agents.find(agent => agent.currentSpeaker === true);

  // Function to dynamically determine the style based on the agent's name
  const getStyleForAgent = (agentName) => {
    switch (agentName) {
      case 'Jesus':
        return styles.jesusMessageStyle; // Define this style in your StyleSheet
      case 'Buddha':
        return styles.buddhaMessageStyle; // Define this style in your StyleSheet
      case 'Muhammad':
        return styles.muhammadMessageStyle; // Define this style in your StyleSheet
      default:
        return styles.defaultAgentMessageStyle; // Define this style in your StyleSheet
    }
  };


  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
        extraScrollHeight={35}
        keyboardShouldPersistTaps="always"
      >

        {/* Overlay Container for DebateTopic */}
        <View
          style={styles.debateTopicOverlayContainer}
          ref={debateTopicRef}
          onLayout={() => {
            debateTopicRef.current.measure((x, y, width, height, pageX, pageY) => {
              // Now you have the height of the DebateTopic, and you can set the paddingTop dynamically
              setDynamicPadding(height + 10); // For example, add 20 for extra spacing
            });
          }}
        >
          <DebateTopic message={route.params.selectedQuestion} />
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={[styles.chatContentContainer, { paddingTop: dynamicPadding }]}
          onScroll={handleScroll}
          onScrollBeginDrag={() => setIsUserTouching(true)}
          onScrollEndDrag={() => setIsUserTouching(false)}
          scrollEventThrottle={16} // Aim for 60fps updates
        >
          {chatMessages.map((msg, index) => (

            msg.author === "user" ? (
              <Text key={index} style={[styles.message, styles.userMessage]}>{msg.text}</Text>
            ) : (
              // Use the getStyleForAgent function to dynamically set the style
              <View key={index} style={msg.isLast ? null : styles.systemMessageContainer}>
                <Text style={[styles.message, getStyleForAgent(msg.author)]}>
                  {getMessageToShow(msg)}
                </Text>
              </View>
            )
          ))}
          {/* Conditionally render the partialResponse if an agent is typing */}
          {agentIsTyping && (
            <View style={styles.systemMessageContainer}>
              <Text style={[styles.message, getStyleForAgent(currentTypingAgent.agentName)]}>
                {currentTypingAgent.agentName}: {partialResponse}
              </Text>
            </View>
          )}
        </ScrollView>

      </KeyboardAwareScrollView>

      {/* AgentView component */}
      <AgentView
        agents={agents} // Pass the array of agents with their details
        onAgentSelect={handleAgentMessage} // Function to handle agent selection
        anyAgentTyping={agentIsTyping}
      />


      <View style={styles.inputContainer}
        color="#FFFFFF"
      >
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Contribute to the conversation..."
          placeholderTextColor="#B3B3B3"
          onSubmitEditing={handleUserMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => {
          handleUserMessage();
          Keyboard.dismiss();
        }}>
          <Text style={styles.buttonText} color='white'>Send</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: '#202020',
    borderColor: '#ccc',
    color: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    height: 50,
  },

  agentIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // Styles for AI agent indicators
  },
  sendButton: {
    backgroundColor: '#E84B4F',
    color: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: 'rgb(255,255,255)',
  },
  debateTopicOverlayContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    zIndex: 1, // Make sure this overlays on top of the ScrollView
  },
  debateTopic: {
    color: "#333",
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 5,
    maxWidth: "80%",
    textAlign: "center",
  },
  agentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  agentCircle: {
    width: 50, // Adjust size as needed
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ADD8E6', // Example color
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentText: {
    // Styling for the text or number inside the circle
  },

  chatContainer: {
    flex: 1,
    marginBottom: 2
  },
  message: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#36454F',
    color: '#fff',
    maxWidth: "70%"
  },
  jesusMessageStyle: {
    backgroundColor: '#0000E7', // A strong royal blue
    color: '#FFFFFF', // White text color for better readability
    padding: 10,
    borderRadius: 5,
    marginVertical: 2,
    alignSelf: 'flex-start',
    maxWidth: '70%',
  },
  buddhaMessageStyle: {
    backgroundColor: '#CC5500', // A Saffron Orange, similar to monk's wear
    color: '#FFFFFF', // White text color for better readability
    padding: 10,
    borderRadius: 5,
    marginVertical: 2,
    alignSelf: 'flex-start',
    maxWidth: '70%',
  },
  muhammadMessageStyle: {
    backgroundColor: '#008000', // A deep verdant green
    color: '#FFFFFF', // White text color for better readability
    padding: 10,
    borderRadius: 5,
    marginVertical: 2,
    alignSelf: 'flex-start',
    maxWidth: '70%',
  },

});

export default Debate;
