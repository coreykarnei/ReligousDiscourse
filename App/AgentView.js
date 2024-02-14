import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

const ThinkingAnimation = () => {
  const animationRef = useRef(null);
  // Replace 100 with the actual total frame count of your thinking animation
  const totalFrames = 240; // Update this to your animation's total frame count

  useEffect(() => {
    const randomFrameStart = Math.floor(Math.random() * totalFrames);
    if (animationRef.current) {
      animationRef.current.play(randomFrameStart, totalFrames);
    }
  }, [totalFrames]);

  const handleAnimationFinish = (isCancelled) => {
    if (!isCancelled) {
      animationRef.current.play(0, totalFrames);
    }
  };

  return (
    <LottieView
      ref={animationRef}
      source={require('./assets/lottie/thinking.json')}
      autoPlay
      loop={false}
      onAnimationFinish={handleAnimationFinish}
      style={{ width: 35, height: 35, marginLeft: -3}}
    />
  );
};

const IdeaAnimation = () => {

  return (
    <LottieView
      source={require('./assets/lottie/lightbulb.json')}
      autoPlay
      loop={true}
      style={{ width: 45, height: 45, marginLeft: -7, marginRight: -6 }}
    />
  );
};

const ReadingAnimation = () => {
  const animationRef = useRef(null);
  // Replace 100 with the actual total frame count of your thinking animation
  const totalFrames = 165; // Update this to your animation's total frame count

  useEffect(() => {
    const randomFrameStart = Math.floor(Math.random() * totalFrames);
    if (animationRef.current) {
      animationRef.current.play(randomFrameStart, totalFrames);
    }
  }, [totalFrames]);

  const handleAnimationFinish = (isCancelled) => {
    if (!isCancelled) {
      animationRef.current.play(0, totalFrames);
    }
  };

  return (
    <LottieView
      ref={animationRef}
      source={require('./assets/lottie/reading.json')}
      autoPlay
      loop={false}
      onAnimationFinish={handleAnimationFinish}
      style={{ width: 35, height: 35, marginLeft: -3 }}
    />
  );
};


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

  const [showWaitMessage, setShowWaitMessage] = useState(false);
  const [typingMessages, setTypingMessages] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTypingMessages = { ...typingMessages };
      
      agents.forEach(agent => {
        if (agent.displayPartialMessage && agent.nextMessage) {
          const currentLength = typingMessages[agent.agentName]?.length || 0;
          if (currentLength < agent.partialMaxLength+1) {
            newTypingMessages[agent.agentName] = agent.nextMessage.slice(0, currentLength + 1);
          } else {
            agent.displayPartialMessage = false; // This should ideally be managed in a more centralized state
            newTypingMessages[agent.agentName] = ''
          }
        }
      });
      setTypingMessages(newTypingMessages);
    }, 10); // Adjust delay as needed

    return () => clearInterval(interval);
  }, [agents, typingMessages]);


  // Function to handle button press
  const handlePress = (agent) => {
    if (agent.buttonClickable) {
      onAgentSelect(agent);
    } else {
      // Show wait message
      setShowWaitMessage(true);
      setTimeout(() => setShowWaitMessage(false), 2000); // Hide after 2 seconds
    }
  };

  const getTextForAgent = (agent) => {
    // Modified to check and display the typing message if present
    if (anyAgentTyping) {
      return `${agent.agentName} is reading...`;
    } else if (agent.thinking) {
      return `${agent.agentName} is thinking...`;
    } else if (agent.displayPartialMessage) {
      return `${agent.agentName}: ${typingMessages[agent.agentName]}`;
    } else {
      return `${agent.agentName}: ${agent.nextMessage?.substring(0, agent.partialMaxLength) || ''}...`;
    }
  };

  return (
    <View style={styles.agentViewContainer}>
      {showWaitMessage && (
        <Text style={styles.waitMessage}>Please wait...</Text>
      )}
      {agents.filter(agent => !agent.currentSpeaker).map((agent, index) => (
        <View key={agent.agentName} style={styles.agentWrapper}>
          <View style={[styles.trim, { backgroundColor: getDarkerColorForAgent(agent.agentName) }]} />
          <TouchableOpacity
            style={[styles.agentButton, { backgroundColor: getBackgroundColorForAgent(agent.agentName) }]}
            onPress={() => handlePress(agent)}
          >
            {anyAgentTyping ? (
              <ReadingAnimation />
            ) : agent.thinking ? (
              <ThinkingAnimation />
            ) : (
              <IdeaAnimation />
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.agentText}>{getTextForAgent(agent)}</Text>
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
    marginBottom: 2,
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
  waitMessage: {
    alignSelf: 'center', // Center horizontally
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'white',
    padding: 8,
    borderRadius: 5,
    marginBottom: 5, // Space above the AgentView
  },
  trim: {
    height: 4,
  },
});

export default AgentView;