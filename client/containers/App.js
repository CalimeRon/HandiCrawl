import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapComponent from '../components/MapComponent';
import AppLoading from 'expo-app-loading';
import * as Location from 'expo-location';
import * as Network from 'expo-network';
import { getCoords } from '../services/apiServices';

export default function App () {
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coords, setCoords] = useState([]);

  let success = false;

  const firstLoad = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let { type } = await Network.getNetworkStateAsync();
    let loc
    while (!success) {
      try {
        loc = await Location.getCurrentPositionAsync();
        // console.log("loc", loc)
        success = true;
      } catch(u_u) {
        console.log("retrying...", u_u);
      }
    }
    setLocation({
      ...loc.coords,
      icon: 'current'
    });
    
    setCoords(getCoords());
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
      <MapComponent location={location} coords={coords}  />
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
