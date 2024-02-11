import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const getBackgroundColorForAgent = (agentName) => {
  switch (agentName) {
    case 'Jesus':
      return 'rgba(65, 105, 225, 0.5)'; // Muted Royal Blue
    case 'Buddha':
      return 'rgba(255, 165, 0, 0.5)'; // Muted Saffron Orange
    case 'Muhammad':
      return 'rgba(0, 128, 0, 0.5)'; // Muted Verdant Green
    default:
      return 'rgba(0, 0, 0, 0.1)'; // Default fallback color
  }
};

const getDarkerColorForAgent = (agentName) => {
  switch (agentName) {
    case 'Jesus':
      return 'rgba(65, 105, 225, 0.8)'; // Darker Royal Blue
    case 'Buddha':
      return 'rgba(255, 165, 0, 0.8)'; // Darker Saffron Orange
    case 'Muhammad':
      return 'rgba(0, 128, 0, 0.8)'; // Darker Verdant Green
    default:
      return 'rgba(0, 0, 0, 0.2)'; // Default darker fallback color
  }
};

const AgentView = ({ agents, onAgentSelect, anyAgentTyping }) => {

  const getTextForAgent = (agent) => {
    if (anyAgentTyping) {
      return `${agent.agentName} is reading`; // Removed the static ellipsis
    } else if (agent.thinking) {
      return `${agent.agentName} is thinking`;
    } else {
      return `${agent.agentName}: ${agent.nextMessage.substring(0, 20)}`;
    }
  };

  return (
    <View style={styles.agentContainer}>
      {agents.filter(agent => !agent.currentSpeaker).map((agent, index) => (
        <View key={agent.agentName} style={styles.agentWrapper}>
          <View style={[styles.trim, { backgroundColor: getDarkerColorForAgent(agent.agentName) }]} />
          <TouchableOpacity 
            style={[styles.agentButton, { backgroundColor: getBackgroundColorForAgent(agent.agentName) }]} 
            onPress={() => onAgentSelect(agent)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.agentText}>{getTextForAgent(agent)}</Text>
              {(anyAgentTyping || agent.thinking) && <ActivityIndicator size="small" color="#0000ff" style={{ marginLeft: 8 }} />}
            </View>
          </TouchableOpacity>
          <View style={[styles.trim, { backgroundColor: getDarkerColorForAgent(agent.agentName) }]} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  agentContainer: {
    alignItems: 'stretch',
  },
  agentWrapper: {
    marginBottom: 3,
  },
  agentButton: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
    height: 35,
  },
  agentText: {
    fontSize: 14,
    color: '#D3D3D3',
    marginLeft: 10,
    flex: 1,
  },
  trim: {
    height: 4,
  },
});

export default AgentView;
