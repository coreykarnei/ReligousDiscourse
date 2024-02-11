import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Welcome from './Welcome';
import Debate from './Debate';
import React, { createContext, useState, useEffect } from 'react';
import * as Font from "expo-font";

const Stack = createStackNavigator();

export default function App() {


  const confirmBack = (navigation) => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to go back?\nYour conversation will be cleared.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => navigation.goBack() }
      ],
      { cancelable: false }
    );
  };

  const [fontLoaded, setFontLoaded] = React.useState(false)

  React.useEffect(() => {
    Font.loadAsync({
      "FantaisieArtistique": require("./assets/fonts/FantaisieArtistique.ttf"),
    })
      .then(() => {
        setFontLoaded(true)
      })
  }, [])

  if (!fontLoaded) return null


  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#282828', // Custom background color
            },
            headerTintColor: '#fff', // Custom text color
          }}>
          <Stack.Screen
            name=" "
            options={{
              headerStyle: {
                height: 60, // Smaller height for welcome screen
                backgroundColor: '#282828',
              }
            }}
            component={Welcome} />
          <Stack.Screen
            name="Debate"
            component={Debate}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => confirmBack(navigation)}>
                  <Text style={{ marginLeft: 10, color: '#fff' }}>Restart</Text>
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
