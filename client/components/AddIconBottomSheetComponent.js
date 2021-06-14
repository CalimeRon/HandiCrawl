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
import * as Location from "expo-location";
import { renderIcon, renderTitle } from "../services/iconFactory";
import { postNewCoord } from "../services/apiServices";
// import DescriptionModal from "./DescriptionModal";

export default function AddIconBottomSheet({
  iconEvent,
  visible,
  setVisible,
  setCoords,
  coords,
}) {
  const [allIcons, setAllIcons] = useState([
    "warning",
    "easyAccess",
    "elevator",
    "ramp",
    "stairs",
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [placeName, onChangePlaceName] = useState("location name");
  const [description, onChangeDescription] = useState("");
  const [selectedIconString, setSelectedIconString] = useState("");
  function hasNumber(string) {
    return /\d/.test(string);
  }
  //map through all icons and render an icon inside the bottom sheet for each
  //each icon is clickable, and on click, opens the second bottom sheet to add
  //details before sending the post request to the db
  const iconButton = allIcons.map((iconString) => {
    return (
      <TouchableOpacity
        key={iconString}
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          borderStyle: "solid",
          borderColor: "blue",
          borderWidth: 1,
          marginRight: 4,
          marginBottom: 4,
        }}
        onPress={() => {
          setSelectedIconString(iconString);
          toggleModal();
        }}
      >
        <Image
          source={renderIcon(iconString)}
          resizeMode="contain"
          style={{
            width: 60,
            height: 60,
            marginBottom: 10,
            backgroundColor: "orange",
          }}
        />
        <Text style={{ backgroundColor: "blue" }}>
          {renderTitle(iconString)}...
        </Text>
      </TouchableOpacity>
    );
  });

  useEffect(() => {
    console.log(placeName);
  }, [placeName]);

  // Modal is now another Bottom sheet. Need to fix the name
  // When you activate toggle modal you enter the 2nd bottom sheet which
  //is used to give a description about an icon
  async function toggleModal() {
    if (!modalVisible) {
      //Get the street address thanks to reverseGeoCode
      const location = await Location.reverseGeocodeAsync({
        latitude: iconEvent.coordinate.latitude,
        longitude: iconEvent.coordinate.longitude,
      });
      onChangePlaceName(
        //if the location is a named place (like 'House of Parliament') render this
        //otherwise render street + number
        `${
          hasNumber(location[0].name)
            ? location[0].street + " " + location[0].name
            : location[0].name
        }`
      );
      setModalVisible(true);
      setVisible(false);
    } else {
      setModalVisible(false);
      setVisible(true);
    }
  }

  // console.log("placeName", placeName);

  return (
    <View>
      <BottomSheet
        visible={visible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
      >
        <View style={styles.bottomNavigationView}>
          <Text style={styles.header}>Click on the icon you want to add </Text>
          <View style={styles.buttonsContainer}>{iconButton}</View>
          <Button title="cancel" onPress={() => setVisible(false)}></Button>
        </View>
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
          <Image
            source={renderIcon(selectedIconString)}
            resizeMode="contain"
            style={{ width: 60, height: 60, marginBottom: 10 }}
          />
          <Text>{selectedIconString}</Text>
          <Text>So you want to add an icon buddy ? </Text>
          <TextInput
            onChangeText={(text) => onChangePlaceName(text)}
            value={placeName}
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          />
          <TextInput
            onChangeText={(text) => onChangeDescription(text)}
            placeholder={"put a description to help adding precisions =)"}
            value={description}
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          />
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {
              const newCoordinate = {
                placeName: placeName,
                icon: selectedIconString,
                latitude: iconEvent.coordinate.latitude,
                longitude: iconEvent.coordinate.longitude,
                description: description === "" ? "" : description,
                score: 0,
              };
              setCoords([...coords, newCoordinate]);
              postNewCoord(newCoordinate);
              setVisible(false);
              setModalVisible(false);
            }}
          >
            <Text style={styles.textStyle}>Send</Text>
          </Pressable>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: "#fff",
    // width: "100%",
    height: 350,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  title: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 3,
    flexWrap: "wrap",
    flexDirection: "row",
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
  header: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
