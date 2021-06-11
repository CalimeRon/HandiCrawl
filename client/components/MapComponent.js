import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
// import current from '../assets/Hawkings.png'
import {StairsSvg, WarningSvg, EasyAccessSvg, ElevatorSvg, RampSvg }from './SVGComponents'

export default function MapComponent ({ location, coords }) {



  const iconToRender = (iconId) => {
    console.log("in icon render")
    switch (iconId) {
      case 'current':
        console.log('in current')
        return <StairsSvg />;
      case 'warning':
        console.log('in warning')
        return <WarningSvg />;
      case 'easyAccess':
        console.log('in easy access')
        return <EasyAccessSvg />;
      case 'elevator':
        console.log('in elevator')
        return <ElevatorSvg />;
      case 'ramp':
        console.log('in ramp');
        return <RampSvg />;
      case 'stairs':
        console.log('in stairs');
        return <StairsSvg />;
      default:
        console.log('in default')
        return require('../assets/smilou.png');
    }
  }
  
  const markerItem = coords.map(coordItem => {
    console.log("placeName", coordItem.placeName);
    return (<MapView.Marker
      key={coordItem._id}
      coordinate={coordItem}
      title={coordItem.placeName}
      description={coordItem.description} >
      {iconToRender(coordItem.icon)}
    </MapView.Marker>);
})

  // console.log(location);
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        region={location !== null ? {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        } : {
          latitude: 43.438232,
          longitude: 26.0933715,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
        provider={MapView.PROVIDER_GOOGLE}
        customMapStyle={customStyle}
      >
        <MapView.Marker
          coordinate={location}
          title="You are here"
          description="let's Roll the chair" >
          {iconToRender(location.icon)}
          {/* <Image
            source={iconToRender(location.icon)}
            style={styles.mapMarker}
            resizeMode='center'
            resizeMethod='resize'
          /> */}
          {/* <Text style={styles.mapMarker}>🤣</Text> */}
        </MapView.Marker>
        {markerItem}

      </MapView>

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
  map: {
    width: Dimensions.get('window').width - 10,
    height: Dimensions.get('window').height - 10,
  },
  mapMarker: {
    width: 40,
    height: 40,
  }
});


const customStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]