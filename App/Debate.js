import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Debate = ({ navigation, route }) => {
    const [userInput, setUserInput] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [ chatMessages, setChatMessages ] = useState('');
    const [ senderLog, setSenderLog ] = useState('');
    const scrollViewRef = React.useRef(null); 

    const DebateTopic = ({ message }) => {
      return <Text style={styles.debateTopic}>{message}</Text>;
    };  

    useEffect(() => {
      // Check if the selectedQuestion parameter is passed in the route
      if (route.params?.selectedQuestion) {
        setSelectedQuestion(route.params.selectedQuestion);
      }
      setChatMessages([ { text: "Debate Topic:" + route.params.selectedQuestion, isUser: true }]);
      setSenderLog([{sender: "User"}])
    }, [route.params]);
    

    const handleUserMessage = async () => {
        Keyboard.dismiss();
        setChatMessages([...chatMessages, { text: "Debate Moderator:" + userInput, isUser: true }]);
        setSenderLog([...senderLog, {sender: "User"}])
        setUserInput('');
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


          
      </KeyboardAwareScrollView>

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

});

export default Debate;
