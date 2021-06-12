import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
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
} from "react-native";
import { BottomSheet } from 'react-native-btr';
import AddIconBottomSheet from '../components/AddIconBottomSheetComponent'


export default function MapRender({ region, setRegion, coords }) {
  const [iconEvent, setIconEvent] = useState({});
  const [visible, setVisible] = useState(false);


  //adapt the size of the icons on the map depending on the zoom level
  const setDimension = (region) => {
    if (region.latitudeDelta > 0.005) return 30;
    else return 50;
  };

  let dimension = setDimension(region);

  // Access the icon png depending on the iconId parameter inside the location object
  const iconToRender = (iconId) => {
    switch (iconId) {
      case "warning":
        return require("../assets/warning.png");
      case "easyAccess":
        return require("../assets/easyAccess.png");
      case "elevator":
        return require("../assets/elevator.png");
      case "ramp":
        return require("../assets/ramp.png");
      case "stairs":
        return require("../assets/stairs.png");
      default:
        return require("../assets/smilou.png");
    }
  };

  //populate the map by looping through each icon coordinate to render and creating a Marker component for each
  const populateRegion = coords.map((coordItem) => {
    return (
      <MapView.Marker
        key={coordItem._id}
        coordinate={coordItem}
        title={
          coordItem.placeName +
          " " +
          coordItem.latitude +
          " " +
          coordItem.longitude
        }
        description={coordItem.description}
        anchor={{ x: 0.5, y: 0.5 }}
      >
        <Image
          style={{ resizeMode: "contain", width: dimension, height: dimension, flex: 1 }}
          source={iconToRender(coordItem.icon)}
        />
      </MapView.Marker>
    );
  });
  
  return (
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
        provider={MapView.PROVIDER_GOOGLE}
        customMapStyle={customStyle}
        showsUserLocation={true}
        showsMyLocationButton={true}
        rotateEnabled={false}
        onLongPress={(e) => {
          setIconEvent(e.nativeEvent)
          setVisible(true)
        }}
      >
        {populateRegion}
      </MapView>

      <AddIconBottomSheet iconEvent={iconEvent} visible={visible} setVisible={setVisible} />
      
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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
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
