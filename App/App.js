import { StyleSheet, Text, View } from 'react-native';
import Welcome from './Welcome'; 
import React from 'react';
import * as Font from "expo-font";

export default function App() {

  // const fetchFonts = async () =>
  // await Font.loadAsync({
  // 'FantaisieArtistique': require('/assets/fonts/FantaisieArtistique.ttf'),
  // });

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
    <Welcome />
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
