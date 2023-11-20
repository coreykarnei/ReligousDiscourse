import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const Chat = ({ navigation, route }) => {
  // Access the passed question/topic if needed
  // const { selectedQuestion, userTopic } = route.params;

  return (
    <View style={styles.container}>

      {/* Chat Area */}
      <View style={styles.chatArea}>
        {/* Chat messages will go here */}
      </View>

      {/* AI Agents Indicators */}
      <View style={styles.agentIndicators}>
        {/* Three circles representing each AI agent */}
      </View>

      {/* Text Input */}
      <TextInput style={styles.textInput} placeholder="Type your message..." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatArea: {
    flex: 1,
    // Styles for chat area
  },
  agentIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // Styles for AI agent indicators
  },
  textInput: {
    // Styles for text input
  },
  // ... additional styles ...
});

export default Chat;
