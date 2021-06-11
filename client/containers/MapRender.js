import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image, Pressable } from "react-native";

// import current from '../assets/Hawkings.png'
import {
  StairsSvg,
  EasyAccessSvg,
  ElevatorSvg,
  RampSvg,
} from "../components/SVGComponents";
// import { WarningSvg } from "./SVGCompTest";
// import Svg, { Circle, Rect, SvgUri } from "react-native-svg";

export default function MapRender({
  region,
  setRegion,
  coords,
}) {

  const setDimension = (region) => {
    if (region.latitudeDelta > 0.005) return 30;
    else return 50;
}

  let dimension = setDimension(region);
  const iconToRender = (iconId) => {
    console.log("in icon render");
    switch (iconId) {
      case "warning":
        console.log("in warning");
        // console.log(WarningSvg())
        return require("../assets/warning.png");
      case "easyAccess":
        console.log("in easy access");
        return require("../assets/easyAccess.png");
      case "elevator":
        console.log("in elevator");
        return require("../assets/elevator.png");
      case "ramp":
        console.log("in ramp");
        return require("../assets/ramp.png");
      case "stairs":
        console.log("in stairs");
        return require("../assets/stairs.png");
      default:
        console.log("in default");
        return require("../assets/smilou.png");
    }
  };

  const populateRegion = coords.map((coordItem) => {
    console.log("placeName", coordItem.placeName);
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
        // icon={{
        //   url: require("../assets/warning.svg"),
        // }}
      >
        {/* {iconToRender(coordItem.icon)} */}
        <Image
          style={{ resizeMode: "stretch", width: dimension, height: dimension }}
          source={iconToRender(coordItem.icon)}
        />
      </MapView.Marker>
    );
  });

  // console.log(location);
  return (
    <View style={styles.container}>
      <MapView
        // onMapReady={() => setRegion()  }
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
        onLongPress={(e) => console.log("pressed!")}
      >
        {populateRegion}

      </MapView>
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
  mapMarker: {},
});

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
