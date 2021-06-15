import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
// import Constants from 'expo-constants'
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native";
import MapRender from "./MapRender";
import AppLoading from "expo-app-loading";
import * as Location from "expo-location";
import * as Network from "expo-network";
import { getCoords, getBounds } from "../services/apiServices";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useFonts,
  K2D_100Thin,
  K2D_100Thin_Italic,
  K2D_200ExtraLight,
  K2D_200ExtraLight_Italic,
  K2D_300Light,
  K2D_300Light_Italic,
  K2D_400Regular,
  K2D_400Regular_Italic,
  K2D_500Medium,
  K2D_500Medium_Italic,
  K2D_600SemiBold,
  K2D_600SemiBold_Italic,
  K2D_700Bold,
  K2D_700Bold_Italic,
  K2D_800ExtraBold,
  K2D_800ExtraBold_Italic,
} from "@expo-google-fonts/dev";

export default function App() {
  const [asyncFirstLoad, setAsyncFirstLoad] = useState(false);
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coords, setCoords] = useState([]);
  const [currentRegion, setCurrentRegion] = useState({});
  const [storedBounds, setStoredBounds] = useState({});
  const [stillInBounds, setStillInBounds] = useState(true);
  const [rerenderFix, setRerenderFix] = useState(1);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const maxZoom = 0.022;

  //load custom fonts for the app
  let [fontsLoaded] = useFonts({
    K2D_100Thin,
    K2D_100Thin_Italic,
    K2D_200ExtraLight,
    K2D_200ExtraLight_Italic,
    K2D_300Light,
    K2D_300Light_Italic,
    K2D_400Regular,
    K2D_400Regular_Italic,
    K2D_500Medium,
    K2D_500Medium_Italic,
    K2D_600SemiBold,
    K2D_600SemiBold_Italic,
    K2D_700Bold,
    K2D_700Bold_Italic,
    K2D_800ExtraBold,
    K2D_800ExtraBold_Italic,
  });

  //function to get new icons from the API service. called when need new icons
  const getNewIcons = async (region) => {
    const newCoords = await getCoords(region);
    if (newCoords) {
      setCoords(newCoords);
      setStillInBounds(true);
    }
  };
  // console.log("coords", coords)

  //check if we're still within the boundaries of the current area whose
  //icons have been retrieved. If not AND if the zoom level is low enough,
  //it fetches from the database the new icons to render
  const updateMapElements = async () => {
    if (!region) return;
    // console.log(coords.length !== 0);
    if (
      region.latitude > storedBounds.minLat &&
      region.latitude < storedBounds.maxLat &&
      region.longitude > storedBounds.minLong &&
      region.longitude < storedBounds.maxLong &&
      asyncFirstLoad === true
    ) {
      console.log("not sending request");
      return;
    }
    if (region.latitudeDelta && region.latitudeDelta > maxZoom) {
      setCoords([]);
      setStoredBounds({});
      return console.log("too far, not fetching");
    }
    setStoredBounds(getBounds(region));
    setStillInBounds(false);
    await getNewIcons(region);
    if (!asyncFirstLoad) setAsyncFirstLoad(true);
  };

  //When the user changes region on the map, call the function that handles what to do
  useEffect(() => {
    updateMapElements();
  }, [region]);

  //first time loading, get the first area to populate based on user location
  useEffect(() => {
    async function prepare() {
      try {
        const result = await firstLoad();
        const theCoords = await getCoords(result);
        setCoords(theCoords);
        setRegion(result.coords);
      } catch (u_u) {
        console.warn(u_u);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
    // firstLoad()
    //   .then((result) => {
    //     // console.log("first then", result);
    //     const theCoords = getCoords(result.coords);
    //     return { result: result, coords: theCoords };
    //   })
    //   .then(({ result, coords }) => {
    //     // console.log("in second theb", result, coords);
    //     setCoords(coords);
    //     setRegion(result.coords);
    //   });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // attempt to fix the userLocationButton that doesn't load on first google maps rendering
  useEffect(() => {
    let timer1 = setTimeout(() => setRerenderFix(0), 5000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  //flag for Location permission onfirstload
  let success = false;

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
        loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        success = true;
        setStoredBounds(getBounds(loc.coords));
      } catch (u_u) {
        console.log("retrying...", u_u);
      }
    }

    return loc;
  };

  // get the screen dimensions for splash screen
  const myDimensions = useWindowDimensions();
  const screenWidth = myDimensions.width;
  const screenHeight = myDimensions.height;
  console.log(StatusBar.currentHeight);

  // if we're still in the app initialization, keep the splash screen
  // if (!asyncFirstLoad || !fontsLoaded ) {
  //   console.log("not loaded");
  //   return (
  //     <View
  //       style={{
  //         ...styles.splash,
  //       }}
  //     >
  //       <Image
  //         style={{ width: screenWidth, height: screenHeight }}
  //         source={require("../assets/newSplash.png")}
  //       />
  //     </View>
  //   );
  // }
  console.log("screen height", screenHeight);
  if (!appIsReady) return null;
  return (
    <View onLayout={onLayoutRootView}>
      <View style={styles.container}>
        <View style={[{ paddingTop: rerenderFix }, styles.metaContainer]}>
          <View style={styles.topMainView}>
            <Text style={[styles.generalText, styles.topMainViewText]}>
              Click on a marker to get and edit information
            </Text>
            <Text style={[styles.generalText, styles.topMainViewText]}>
              Press on a location to add a marker
            </Text>
          </View>
          <MapRender
            region={region}
            coords={coords}
            setRegion={setRegion}
            setCoords={setCoords}
            stillInBounds={stillInBounds}
            maxZoom={maxZoom}
            setMapLoaded={setMapLoaded}
          />
          <View style={styles.bottomMainView}>
            <Text>Hella</Text>
          </View>
        </View>
      </View>
      <StatusBar style="light" hidden={true} />
    </View>
  );
}

const myScreen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  widthRatio: 1,
  heightRatio: 1,
};

const styles = StyleSheet.create({
  bottomMainView: {
    backgroundColor: "#EAF0F2",
    width: "100%",
    height: myScreen.height * 0.1,
  },
  container: {
    // flex: 1,
    backgroundColor: "#1C333E",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
    // position: "absolute",
    // top: 50,

    width: myScreen.width * myScreen.widthRatio,
    height: myScreen.height * myScreen.heightRatio,
  },
  container2: {},
  metaContainer: {
    backgroundColor: "#EAF0F2",
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
  },
  generalText: {
    fontFamily: "K2D_600SemiBold",
    color: "#1C333E",
  },
  splash: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A8EBF4",
    resizeMode: "cover",
  },
  topMainView: {
    // backgroundColor: "yellow",
    width: "100%",
    position: "absolute",
    top: "1%",
    zIndex: 1,
  },
  topMainViewText: {
    textAlign: "center",
    fontSize: 15,
    color: "#9FBBC5",
  },
});
