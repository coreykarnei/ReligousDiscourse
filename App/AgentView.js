// AgentView.js

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const AgentView = ({ agents, onAgentSelect }) => {
  return (
    <View style={styles.agentContainer}>
        {agents.filter(agent => !agent.currentSpeaker).map((agent, index) => (
        <TouchableOpacity 
            key={agent.id} 
            style={styles.agentCircle} 
            onPress={() => onAgentSelect(agent)}
        >
            <Image source={agent.image} style={styles.agentImage} />
            <Text style={styles.agentText}>{agent.eagerness}</Text>
        </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  agentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // Add other styling as needed
  },
  agentCircle: {
    width: 50, // Adjust size as needed
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ADD8E6', // Example color
    justifyContent: 'center',
    alignItems: 'center',
    // Add other styling as needed
  },
  agentText: {
    // Styling for the text or number inside the circle
  },
  // Add other styles as needed
});

export default AgentView;
