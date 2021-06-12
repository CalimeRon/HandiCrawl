import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapRender from "./MapRender";
import AppLoading from "expo-app-loading";
import * as Location from "expo-location";
import * as Network from "expo-network";
import { getCoords } from "../services/apiServices";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


/* 
TESTING REACT NAVIGATION
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {
          itemId: 86,
          otherParam: 'anything you want'
        })}
      />
    </View>
  );
}

function DetailsScreen({route, navigation}) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>itemID: {JSON.stringify(itemId)} </Text>
      <Text>otherParam: {JSON.stringify(otherParam)} </Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details', {
          itemId: Math.floor(Math.random() * 100),
        })}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
        />
    </View>
  );
}

const Stack = createStackNavigator();
*/

export default function App() {
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coords, setCoords] = useState([]);
  const [currentRegion, setCurrentRegion] = useState({});

  let success = false;

  //When the user changes region on the map, call the new icons to render on the map
  useEffect(() => {
    getNewIcons(region);
  }, [region]);

  //function to get new icons from the API service
  const getNewIcons = async (region) => {
    const newCoords = await getCoords(region);
    setCoords(newCoords);
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
        // console.log("loc", loc)
        success = true;
      } catch (u_u) {
        console.log("retrying...", u_u);
      }
    }
    //... then load the icons for the region of the current user location
    await setRegion({
      ...loc.coords,
      icon: "current",
    });
  };

  //Wait in the splash screen to get permission to get the location before loading the map.
  if (!locationLoaded) {
    return (
      <AppLoading
        startAsync={firstLoad}
        onFinish={() => setLocationLoaded(true)}
        onError={console.warn}
      />
    );
  }
  return (
    /*
    LEARNING REACT NAVIGATION
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    */
    
    <View style={styles.container}>
      <MapRender region={region} coords={coords} setRegion={setRegion} />
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
