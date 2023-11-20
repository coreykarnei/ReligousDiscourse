import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Keyboard, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AgentView from './AgentView';

const Debate = ({ navigation, route }) => {
    const [userInput, setUserInput] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [ chatMessages, setChatMessages ] = useState('');
    const scrollViewRef = React.useRef(null); 
    const [agents, setAgents] = useState([
      {
        id: 'Jesus',
        eagerness: 3, 
        // image: require('./path_to_jesus_image.png'), // Path to the image file
        nextMessage: 'next message here...', // The next message they would say
        currentSpeaker: false
      },
      {
        id: 'Buddha',
        eagerness: 3,
        // image: require('./path_to_buddha_image.png'),
        nextMessage: 'next message here...',
        currentSpeaker: false
      },
      {
        id: 'Muhammad',
        eagerness: 3,
        // image: require('./path_to_muhammad_image.png'),
        nextMessage: 'next message here...',
        currentSpeaker: false
      }
    ]);
    
    useEffect(() => {
      // Add passed in debate topic to chat history
      setChatMessages([ { text: "Debate Topic:" + route.params.selectedQuestion, author: "user" }]);
    }, [route.params]);

    const DebateTopic = ({ message }) => {
      return <Text style={styles.debateTopic}>{message}</Text>;
    };  

    const handleUserMessage = async () => {
        Keyboard.dismiss();
        setChatMessages([...chatMessages, { text: "Debate Moderator:" + userInput, author: 'user' }]);
        setUserInput('');

        // temporary filler message changes for agents
        
      };

    const getRandomEagerness = () => Math.floor(Math.random() * 5) + 1;

    const handleAgentMessage = async (currentAgent) => {
      setChatMessages([...chatMessages, { text: currentAgent.message, author: currentAgent.id }]);
      setUserInput('');
      
      // temporary filler message changes for agents
      const updatedAgents = agents.map(agent => {
        if (agent.id === currentAgent.id) {
          // Set currentSpeaker flag to true for the current agent
          return { ...agent, currentSpeaker: true };
        } else {
          // Update eagerness and message for other agents
          const newEagerness = getRandomEagerness(); // Assuming you have a function to get random eagerness
          const newMessage = "temp rand string"; // Assuming you have a function to get a new message based on agent's id
          return { ...agent, eagerness: newEagerness, message: newMessage, currentSpeaker: false };
        }
      });

      setAgents(updatedAgents);
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
        
        <DebateTopic message={"Debate Topic: " + route.params.selectedQuestion} />

        {/* This is where the scrollview will go */}
        {/* Inside the scrollview is where the logic for displaying the chat messages will be */}

      </KeyboardAwareScrollView>

      {/* AgentView component */}
      <AgentView 
        agents={agents} // Pass the array of agents with their details
        onAgentSelect={handleAgentMessage} // Function to handle agent selection
      />
      

      <View style={styles.inputContainer}
      color="#FFFFFF"
      >
        <TextInput
        style={styles.input}
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Type your message"
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
    paddingBottom:25,
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
    backgroundColor: '#007AFF',
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
    maxWidth: "95%",
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

});

export default Debate;
