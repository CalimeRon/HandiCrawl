import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapComponent from '../components/MapComponent';
import AppLoading from 'expo-app-loading';
import * as Location from 'expo-location';

export default function App () {
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const firstLoad = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let loc = await Location.getCurrentPositionAsync({accuracy: 5});
    setLocation(loc.coords);

  }


    if (!locationLoaded) {
      return (
        <AppLoading
          startAsync={firstLoad}
          onFinish={() => setLocationLoaded(true)}
          onError={console.warn}
      />
    )
  }
  return (
    <View style={styles.container}>
      <MapComponent location={location}  />
      <StatusBar style="auto" />
      <Text>Hello</Text>
    </View>
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
