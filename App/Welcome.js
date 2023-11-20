import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const Welcome = ({ navigation }) => {
  const [selectedQuestion, setSelectedQuestion] = React.useState("I'll provide my own topic.");

  const handleStartChatting = () => {
    if (selectedQuestion === "I'll provide my own topic.") {
      // Prompt user for discussion topic
      // You can use a simple Alert or a custom modal for this
      Alert.prompt(
        "Enter Your Topic",
        "Type your discussion topic:",
        (text) => {
            navigation.navigate('Debate', { selectedQuestion: text }) ;
        }
      );
    } else{ 
        // Navigate to Debate page with the selected question
        navigation.navigate('Debate', { selectedQuestion });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Divine</Text>
        <Text style={styles.title}>Debates</Text>
      </View>

      {/* Pre-made message options and other UI elements */}
      <Text style={styles.messageOptionsTitle}>Discussion topic:</Text>
      <Picker
        selectedValue={selectedQuestion}
        style={styles.picker}
        itemStyle={{ backgroundColor: "121212", color: "white", fontSize:17 }}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedQuestion(itemValue)
        }>
        <Picker.Item label="What does it mean to be happy?" value="What does it mean to be happy?" />
        <Picker.Item label="Are humans innately good or evil?" value="Are humans innately good or evil?" />
        <Picker.Item label="Is it okay to lie to protect yourself?" value="Is it okay to lie to protect yourself?" />
        <Picker.Item label="Do all people deserve respect?" value="Do all people deserve respect?" />
        <Picker.Item label="I'll provide my own topic." value="I'll provide my own topic." />
        <Picker.Item label="What is the meaning of life?" value="What is the meaning of life?" />
        <Picker.Item label="Why does suffering exist?" value="Why does suffering exist?" />
        <Picker.Item label="What makes us human?" value="What makes us human?" />
        <Picker.Item label="Is ignorance really bliss?" value="Is ignorance really bliss?" />
      </Picker>
      
      {/* Navigation button example (commented out) */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
            style={styles.customButton} 
            onPress={handleStartChatting}
        >
            <Text style={styles.buttonText}>Let the debate begin!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818', // Dark background color
    alignItems: 'center',
    justifyContent: 'center',
    },  
  titleContainer: {
    height: windowHeight * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: windowHeight * 0.12, 
    color: '#FFFFFF', 
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'FantaisieArtistique', 
  },
  messageOptionsTitle: {
    color: '#FFFFFF', 
    fontSize: 16,
    marginBottom: 5,
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%', // Adjust width as needed
  },
  customButton: {
    marginTop: 0,
    backgroundColor: '#007AFF', // Button color
    bottom: 0, 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  picker: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.25,
    backgroundColor: '#181818',
    color: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF', // Text color
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Welcome;
