import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const Welcome = ({ navigation }) => {
  const [selectedQuestion, setSelectedQuestion] = React.useState("user");

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
        <Picker.Item label="What does it mean to be happy?" value="lie" />
        <Picker.Item label="Are humans innately good or evil?" value="lie" />
        <Picker.Item label="Is it okay to lie to protect yourself?" value="lie" />
        <Picker.Item label="Do all people deserve respect?" value="respect" />
        <Picker.Item label="I'll provide my own topic." value="user" />
        <Picker.Item label="What is the meaning of life?" value="life" />
        <Picker.Item label="Why does suffering exist?" value="suffering" />
        <Picker.Item label="What makes us human?" value="human" />
        <Picker.Item label="Is ignorance really bliss?" value="ignorance" />
      </Picker>
      
      {/* Navigation button example (commented out) */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
            style={styles.customButton} 
            onPress={() => navigation.navigate('Chat')}
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
    backgroundColor: '#121212', // Dark background color
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
    marginBottom: 10,
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%', // Adjust width as needed
  },
  customButton: {
    marginTop: 20,
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
    height: windowHeight * 0.3,
    backgroundColor: '#121212',
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
