import { BottomSheet } from "react-native-btr";
import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import * as Location from 'expo-location'
import renderIcon from "../services/iconRendering";
import { postNewCoord } from "../services/apiServices";
import DescriptionModal from "./DescriptionModal";

export default function AddIconBottomSheet({
  iconEvent,
  visible,
  setVisible,
  setCoords,
  coords,
}) {
  const [allIcons, setAllIcons] = useState(["warning", "easyAccess", "elevator", "ramp", "stairs"]);
  const [modalVisible, setModalVisible] = useState(false);
  const [placeName, onChangePlaceName] = useState('location name')
  const iconButton = allIcons.map((iconString) => {
    return (
      <TouchableOpacity
        key={iconString}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 0,
        }}
        onPress={() => {
          const newCoordinate = {
            placeName: "test",
            icon: iconString,
            latitude: iconEvent.coordinate.latitude,
            longitude: iconEvent.coordinate.longitude,
            description: "testouille",
          };
          setCoords([...coords, newCoordinate]);
          postNewCoord(newCoordinate);
          setVisible(false);
        }}
      >
        <Image
          source={renderIcon(iconString)}
          resizeMode="contain"
          style={{ width: 60, height: 60, marginBottom: 10 }}
        />
        <Text>{iconString}</Text>
      </TouchableOpacity>
    );
  });
  // if (!visible) return <View></View>;
  console.log("icon event", iconEvent);

  useEffect(() => {
    Location.reverseGeocodeAsync({ latitude: iconEvent.coordinate.latitude, longitude: iconEvent.coordinate.longitude })
      .then(result => console.log(result));
  }, [modalVisible])

  function toggleModal () {
    console.log("entered modal")
    if (!modalVisible) {
      setModalVisible(true)
      setVisible(false)
    } else {
      setModalVisible(false)
      setVisible(true)
    }
  }

  return (
    <View>
    <BottomSheet
      visible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
    >
      <View style={styles.bottomNavigationView}>
        <Text>So you want to add an icon buddy ? </Text>
        <View style={styles.buttonsContainer}>{iconButton}</View>
      </View>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => toggleModal()}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
      
      <Button title="cancel" onPress={() => setVisible(false)}></Button>
    </BottomSheet>
    {/* {modalVisible ? <DescriptionModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      toggleModal={toggleModal}
    /> : null} */}
      <BottomSheet
        visible={modalVisible}
        onBackButtonPress={() => toggleModal()}
      onBackdropPress={() => toggleModal()}
      >
        <View style={styles.bottomNavigationView}>
        <Text>So you want to add an icon buddy ? </Text>
      </View>
    </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 250,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    zIndex: -1,
  },
  title: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 3,
    flexWrap: "wrap",
    flexDirection: "column",
    // backgroundColor: 'blue',
    marginTop: 20,
    justifyContent: "center",
    // alignItems: 'center',
    width: 400,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
