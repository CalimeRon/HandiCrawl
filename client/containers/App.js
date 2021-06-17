import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import Constants from "expo-constants";
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
  TextInput,
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
import { TouchableOpacity } from "react-native-gesture-handler";
import InfoModal from "../components/InfoModal";

export default function App() {
  const [asyncFirstLoad, setAsyncFirstLoad] = useState(false);
  const [region, setRegion] = useState(null); //state that holds the current region the user is on
  const [errorMsg, setErrorMsg] = useState(null);
  const [coords, setCoords] = useState([]); //state that holds the array of markers to render in the area
  const [storedBounds, setStoredBounds] = useState({}); //state that holds the bounds of the area containing the current markers
  const [stillInBounds, setStillInBounds] = useState(true); //state that... is not ever checked now that I look at the code.
  //I'll keep it for you guys to deal with it but it's probably bound to be removed

  const [rerenderFix, setRerenderFix] = useState(1); //A fix attempt on Android, since some google map buttons don't appear on the first render. Didn't work.
  const [mapLoaded, setMapLoaded] = useState(false); //probably useless too now.
  const [appIsReady, setAppIsReady] = useState(false); //very important state that will keep the splashscreen as long as we are fetching
  //the user location and the first set of data from database
  const [infoModalVisible, setInfoModalVisible] = useState(false); // state that will render the information modal if set to true
  const maxZoom = 0.022; //holds the threshold of altitude above which the icons should stop appearing on the map

  //load custom fonts for the app
  let [fontsLoaded] = useFonts({
    K2D_300Light_Italic, //
    K2D_400Regular_Italic, //
    K2D_500Medium_Italic, //
    K2D_600SemiBold, //
    K2D_800ExtraBold, //
  });

  //first time loading, get the first area to populate based on user location
  useEffect(() => {
    async function prepare() {
      try {
        //get user permission to access location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        //get user location
        let loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        //initiate the first states based on user location
        setStoredBounds(getBounds(loc.coords));
        setRegion(loc.coords);
        let settingCoords = await getCoords(loc.coords);
        setCoords(settingCoords);
      } catch (u_u) {
        console.warn(u_u);
      } finally {
        //Everything is loaded, we're good to go =)
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  //When the user changes region on the map, call the function that handles what to do
  useEffect(() => {
    updateMapElements();
  }, [region]);

  //function to get new icons from the API service. called when need new icons
  const getNewIcons = async (region) => {
    console.log("entering getnewicons");
    const newCoords = await getCoords(region);
    if (newCoords) {
      setCoords(newCoords);
      setStillInBounds(true);
    }
  };

  /*
    The function updaMapElements() below is called everytime the region changes, meaning everytime
    the user interacts with the map(go to another location, zoom out), 
  
    It will :
    -check if we're still within the boundaries of the current area whose icons have already been retrieved.
    -check if the zoom level is above a threshold
    - if any of those checks pass, we don't do anything
    - otherwise we call the database and populate the new area
    */
  const updateMapElements = async () => {
    console.log("entering updateelements, asyncfirstload is", asyncFirstLoad);
    if (!region) return;
    //At launch, the map loads coordinate around an area beyong the simple screen view. this below checks if we're
    //still in the area when the user drags the map. If we're still in them, we don't call the database
    if (
      region.latitude > storedBounds.minLat &&
      region.latitude < storedBounds.maxLat &&
      region.longitude > storedBounds.minLong &&
      region.longitude < storedBounds.maxLong &&
      asyncFirstLoad === true
    ) {
      console.log("not sending request");
      setStillInBounds(true);
      return;
    }
    //If the user zooms out too much, the icons should disappear (setCoords([])
    if (region.latitudeDelta && region.latitudeDelta > maxZoom) {
      setCoords([]);
      setStoredBounds({});
      return console.log("too far, not fetching");
    }
    //if all the checks above fail, it means we need to store the new bounds of the area
    //and call the database to populate the area with the appropriate markers(if any)
    setStoredBounds(getBounds(region));
    setStillInBounds(false);
    await getNewIcons(region);
    setAsyncFirstLoad(true);
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // attempt to fix the userLocationButton that doesn't load on first google maps rendering.
  //  This function is a ghost of the past failed attempts.
  // useEffect(() => {
  //   let timer1 = setTimeout(() => setRerenderFix(0), 5000);
  //   return () => {
  //     clearTimeout(timer1);
  //   };
  // }, []);

  //flag for Location permission onfirstload. It will keep trying to get
  //user location until it's finally there
  let success = false;

  if (!appIsReady) return null;

  return (
    <View onLayout={onLayoutRootView}>
      <View style={styles.container}>
        <View style={[styles.metaContainer]}>
          <View style={styles.topMainView}>
            <Text style={[styles.generalText, styles.topMainViewText]}>
              Click on a marker to get and edit information
            </Text>
            <Text style={[styles.generalText, styles.topMainViewText]}>
              Press on a location to add a marker
            </Text>
          </View>
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBarTextContainer}>
              <TextInput
                placeholder="Search location..."
                style={[styles.italicText, styles.searchBarText]}
              ></TextInput>
            </View>
          </View>
          {/* Behold, the actual map view below */}
          <MapRender
            region={region}
            coords={coords}
            setRegion={setRegion}
            setCoords={setCoords}
            maxZoom={maxZoom}
            setMapLoaded={setMapLoaded}
            stillInBounds={stillInBounds}
          />
          <View style={styles.bottomMainView}>
            <Text></Text>
          </View>
          <View style={styles.infoContainerContainer}>
            <TouchableOpacity
              onPress={() => {
                setInfoModalVisible(true);
              }}
              style={styles.infoContainer}
            >
              <Image
                style={styles.infoIcon}
                resizeMode="contain"
                source={require("../assets/infoIcon.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* render the info Modal only when infoModalVisible is true. That is, when the icon above is pressed */}
      {infoModalVisible ? (
        <View>
          <InfoModal
            infoModalVisible={infoModalVisible}
            setInfoModalVisible={setInfoModalVisible}
          />
        </View>
      ) : null}
      <StatusBar style="light" hidden={false} />
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
    // height: myScreen.height * 0.05,
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
    height: "85%",
  },
  generalText: {
    fontFamily: "K2D_600SemiBold",
    color: "#1C333E",
  },
  italicText: {
    fontFamily: "K2D_500Medium_Italic",
  },
  infoContainer: {
    // height: '10%',
    // position: "absolute",
    // backgroundColor: "orange",
    // zIndex: 1,
    // bottom: 440,
    // left: 100,
  },
  infoContainerContainer: {
    // backgroundColor: 'blue',
    position: "absolute",
    right: 30,
    top: 40,
  },
  infoIcon: {
    height: 40,
    width: 40,
    // backgroundColor: "yellow",
    // position: "absolute",
    // bottom: 170,
    // left: 10,
    zIndex: 3,
  },
  searchBarContainer: {
    backgroundColor: "#F3F6F7",
    position: "absolute",
    width: "80%",
    height: "8%",
    zIndex: 1,
    elevation: 10,
    right: "10%",
    bottom: "15%",
    borderRadius: 100,
    // justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  searchBarIcon: {
    // flex: 1,
    marginLeft: 14,
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellow",
  },
  searchBarIconImg: {
    height: "70%",
    // alignItems: 'center',
    // justifyContent:'center',
  },
  searchBarTextContainer: {
    justifyContent: "center",
    // backgroundColor: 'yellow',
    flexDirection: "row",
    height: "100%",
  },
  searchBarText: {
    marginLeft: 10,
    alignItems: "center",
    fontSize: 20,
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
    top: -60,
    zIndex: 1,
  },
  topMainViewText: {
    textAlign: "center",
    fontSize: 15,
    color: "#9FBBC5",
  },
});

//TODO: have a default region if the user doesn't give permission
