import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import CalloutModal from "../components/CalloutModal";
import EditModal from "../components/EditModal";
import IconModal from "../components/IconModal";
import { BlurView } from "expo-blur";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
  Alert,
  Modal,
  TouchableHighlight,
  KeyboardAvoidingView,
  useWindowDimensions,
  Platform,
  ScrollView,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import AddIconBottomSheet from "../components/AddIconBottomSheetComponent";
import { renderIcon } from "../services/iconFactory";
// import CalloutComponent from "../components/CalloutComponent";

export default function MapRender({
  region,
  setRegion,
  coords,
  setCoords,
  stillInBounds,
  maxZoom,
  setMapLoaded,
}) {
  const [iconEvent, setIconEvent] = useState({});
  const [visible, setVisible] = useState(false);
  const [bottomSheetTriggered, setBottomSheetTriggered] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCallout, setCurrentCallout] = useState(null);
  const [currentIconSelected, setCurrentIconSelected] = useState(null);

  const [editModalScreen, setEditModalScreen] = useState(false);
  const [iconEditModalScreen, setIconEditModalScreen] = useState(false);

  const myDimensions = useWindowDimensions();
  const [temporaryHandiMarker, setTemporaryHandiMarker] = useState(null);
  // const [mapOpacity, setMapOpacity] = useState(0.1) //TODO: opacity
  const screenWidth = myDimensions.width;
  const screenHeight = myDimensions.height;

  useEffect(() => {
    // console.log('in useEffect', currentIconSelected, currentCallout, coords)
    setDimension(region);
    if (!currentIconSelected) return;
    const iconSelected = coords.filter((coord) => {
      return (
        coord.latitude === currentIconSelected.latitude &&
        coord.longitude === currentIconSelected.longitude
      );
    });
    setCurrentCallout(iconSelected[0]);
    // console.log("current callout",currentCallout)
  }, [currentIconSelected, region.latitudeDelta]);

  //adapt the size of the icons on the map depending on the zoom level
  const setDimension = (region) => {
    if (!region) return;
    if (region.latitudeDelta > 0.004) return 30;
    else return 50;
  };

  //creates the conditional width and height of icons by calling setDimension
  let dimension = setDimension(region);

  //populate region will render the actual icon for each coordinate loaded in the area
  //by looping through the coords array
  let populateRegion;
  if (
    coords.length !== 0 &&
    coords !== undefined &&
    region.latitudeDelta < maxZoom
  ) {
    populateRegion = coords.map((coordItem) => {
      console.log("firing populate region");
      return (
        <View
          key={coordItem.latitude + coordItem.longitude}
          style={styles.markerContainer}
        >
          <MapView.Marker
            style={styles.marker}
            coordinate={coordItem}
            anchor={{ x: 0.5, y: 0.5 }}
            onPress={(e) => {
              // console.log("populating icons, coorditem=", e.nativeEvent)
              setModalVisible(true);
              setCurrentIconSelected(e.nativeEvent.coordinate);
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: "yelloww",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                resizeMode="contain"
                style={{
                  width: dimension,
                  height: dimension,
                  shadowColor: "#000",
                }}
                source={renderIcon(coordItem.icon)}
              />
            </View>
            <MapView.Callout tooltip={false}>
              {/*  */}
              {/* <CalloutComponent coordItem={coordItem} /> */}
            </MapView.Callout>
          </MapView.Marker>
        </View>
      );
    });
  } else populateRegion = null;
  //populate the map by looping through each icon coordinate to render and creating a Marker component for each

  function toggleCalloutToEdit() {
    setModalVisible(!modalVisible);
    setEditModalScreen(!editModalScreen);
  }

  function toggleEditToIconSelection() {
    setIconEditModalScreen(!iconEditModalScreen);
    setEditModalScreen(!editModalScreen);
  }

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS == "ios" ? "padding" : "height"}
    //   keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
    //   enabled={Platform.OS === "ios" ? true : false}
    // >

    <View style={styles.container}>
      <MapView
        onRegionChangeComplete={(region) => setRegion(region)}
        style={styles.map}
        initialRegion={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        loadingEnabled={true}
        provider={MapView.PROVIDER_GOOGLE}
        onMapReady={() => setMapLoaded(true)}
        customMapStyle={customStyle}
        showsUserLocation={true}
        showsMyLocationButton={true}
        rotateEnabled={false}
        onLongPress={(e) => {
          if (region.latitudeDelta > maxZoom) return;
          else {
            setIconEvent(e.nativeEvent);
            setVisible(true);
            setBottomSheetTriggered(true);
          }
        }}
      >
        {populateRegion}
      </MapView>
      {bottomSheetTriggered ? (
        <AddIconBottomSheet
          iconEvent={iconEvent}
          visible={visible}
          setVisible={setVisible}
          setBottomSheetTriggered={setBottomSheetTriggered}
          setCoords={setCoords}
          coords={coords}
        />
      ) : null}

      {currentCallout ? (
        <View style={styles.modalContainer}>
          <CalloutModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            currentCallout={currentCallout}
            editModalScreen={editModalScreen}
            setEditModalScreen={setEditModalScreen}
            toggleCalloutToEdit={toggleCalloutToEdit}
          />
        </View>
      ) : null}

      {editModalScreen ? (
        <View style={styles.modalContainer}>
          <EditModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            currentCallout={currentCallout}
            editModalScreen={editModalScreen}
            setEditModalScreen={setEditModalScreen}
            toggleCalloutToEdit={toggleCalloutToEdit}
            temporaryHandiMarker={temporaryHandiMarker}
            setTemporaryHandiMarker={setTemporaryHandiMarker}
            toggleEditToIconSelection={toggleEditToIconSelection}
            setIconEditModalScreen={setIconEditModalScreen}
            coords={coords}
            setCoords={setCoords}
          />
        </View>
      ) : null}

      {iconEditModalScreen ? (
        <View style={styles.modalContainer}>
          <IconModal
            toggleEditToIconSelection={toggleEditToIconSelection}
            setTemporaryHandiMarker={setTemporaryHandiMarker}
            iconEditModalScreen={iconEditModalScreen}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            currentCallout={currentCallout}
            editModalScreen={editModalScreen}
            setEditModalScreen={setEditModalScreen}
            toggleCalloutToEdit={toggleCalloutToEdit}
            temporaryHandiMarker={temporaryHandiMarker}
            setIconEditModalScreen={setIconEditModalScreen}
          />
        </View>
      ) : null}
    </View>

    // </KeyboardAvoidingView>
  );
}

const myScreen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  widthRatio: 1,
  heightRatio: 0.65,
};
// const screenRatio = [0.85,0.9]

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 70,
    // borderTopLeftRadius: 50,
    // borderWidth: 40,
    // marginTop: 70,
    // borderTopWidth: 60,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderColor: "#EAF0F2",
    overflow: "hidden",
    marginTop: 70,
    // paddingTop: 20,
    width: myScreen.width * myScreen.widthRatio,
    height: myScreen.height * myScreen.heightRatio,
    // width: '100%',
    // height: '100%',
    // position: 'absolute',
    // left: '7%',
    // zIndex: 1,
    // elevation: 20,
    // top: myScreen.height * 0.15,
    // left: myScreen.width * 0,
  },
  map: {
    width: "100%",
    height: "120%",
    overflow: "hidden",
    bottom: -25,
  },
  markerContainer: {
    elevation: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // flexDirection: 'column',
    position: "absolute",
  },
  marker: {
    // backgroundColor: 'blue'
  },
});

//imported style for regular markers of the map
const customStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#ebe3cd",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#523735",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f1e6",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#c9b2a6",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#dcd2be",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ae9e90",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#93817c",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#a5b076",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#447530",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f1e6",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#fdfcf8",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#f8c967",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#e9bc62",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#e98d58",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#db8555",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#806b63",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8f7d77",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ebe3cd",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#b9d3c2",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#92998d",
      },
    ],
  },
];
