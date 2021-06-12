import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapRender from "./MapRender";
import AppLoading from "expo-app-loading";
import * as Location from "expo-location";
import * as Network from "expo-network";
import { getCoords, getBounds } from "../services/apiServices";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coords, setCoords] = useState([]);
  const [currentRegion, setCurrentRegion] = useState({});
  const [storedBounds, setStoredBounds] = useState({})
  const [needUpdateBonds, setNeedUpdateBonds] = useState(false);
  let success = false;


  //When the user changes region on the map, call the new icons to render on the map
  useEffect(() => {
    if (!region) return;
    console.log(coords.length !== 0);
    if (
      region.latitude > storedBounds.minLat &&
      region.latitude < storedBounds.maxLat &&
      region.longitude > storedBounds.minLong &&
      region.longitude < storedBounds.maxLong
    ) {
      console.log("not sending request");
      return;
    }
    getNewIcons(region);
    setStoredBounds(getBounds(region));
  }, [region]);

  useEffect(() => {
    firstLoad().then((result) => {
      setRegion(result.coords);
      setLocationLoaded(true);
      setStoredBounds(getBounds(region))
    });
  }, []);

  //function to get new icons from the API service
  const getNewIcons = async (region) => {
    const newCoords = await getCoords(region);
    if (newCoords) setCoords(newCoords);
  };

  //on first load, get authorization for location...
  const firstLoad = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let { type } = await Network.getNetworkStateAsync();
    let loc;
    while (!success) {
      try {
        loc = await Location.getCurrentPositionAsync();
        success = true;
      } catch (u_u) {
        console.log("retrying...", u_u);
      }
    }
    //... then load the icons for the region of the current user location
    return loc;
  };

  //Wait in the splash screen for the resolution of firstload() before loading the map.
  // if (!locationLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={firstLoad}
  //       onFinish={() => {
  //         setLocationLoaded(true);
  //       }}
  //       onError={console.warn}
  //     />
  //   );
  // }

  if (!locationLoaded) {
    console.log("not loaded");
    return (
      <View>
        <Text> Loading... </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapRender
        region={region}
        coords={coords}
        setRegion={setRegion}
        setCoords={setCoords}
      />
      <StatusBar style="auto" />
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
