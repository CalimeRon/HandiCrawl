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
  useWindowDimensions,
} from "react-native";
import * as Location from "expo-location";
import { renderIcon, renderTitle, allIcons } from "../services/iconFactory";
import { postNewCoord } from "../services/apiServices";
// import DescriptionModal from "./DescriptionModal";
// import allIcons from '../services/iconFactory';

export default function AddIconBottomSheet({
  iconEvent,
  visible,
  setVisible,
  setCoords,
  coords,
}) {
  // const [allIcons, setAllIcons] = useState([
  //   "warning",
  //   "easyAccess",
  //   "elevator",
  //   "ramp",
  //   "stairs",
  // ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [placeName, onChangePlaceName] = useState("location name");
  const [description, onChangeDescription] = useState("");
  const [selectedIconString, setSelectedIconString] = useState("");
  const currentWidth = useWindowDimensions().width;
  const paddingPercent = 5;
  const effectivePadding = Math.floor((paddingPercent * currentWidth) / 100);
  // console.log("width", currentWidth, effectivePadding)

  function hasNumber(string) {
    return /\d/.test(string);
  }
  //map through all icons and render an icon inside the bottom sheet for each
  //each icon is clickable, and on click, opens the second bottom sheet to add
  //details before sending the post request to the db
  const iconButton = allIcons.map((iconString) => {
    return (
      <View style={styles.iconImgContainer} key={iconString}>
        <TouchableOpacity
          key={iconString}
          style={styles.handiMarkerContainer}
          onPress={() => {
            setSelectedIconString(iconString);
            toggleModal();
          }}
        >
          <View style={styles.markerImgWrapper}>
            <Image
              source={renderIcon(iconString)}
              resizeMode="contain"
              style={styles.iconImg}
            />
          </View>
          <Text style={styles.generalText}>{renderTitle(iconString)}...</Text>
        </TouchableOpacity>
      </View>
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
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,

          elevation: 9,
        }}
      >
        <View style={styles.bottomNavigationView}>
          <Text style={[styles.generalText, styles.header]}>
            Add a HandiMarker
          </Text>
          <View style={styles.closeIconContainer}>
            <TouchableOpacity
              // style={styles.handiMarkerContainer}
              onPress={() => {
                setVisible(false);
              }}
            >
              <Image
                source={require("../assets/closeIcon.png")}
                resizeMode="contain"
                style={styles.closeIconImg}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.buttonsContainer,
              {
                paddingLeft: effectivePadding,
                paddingRight: effectivePadding,
              },
            ]}
          >
            {iconButton}
          </View>
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
        <View style={styles.bottomAddIconView}>
          <View style={styles.addIconImgContainer}>
            <Image
              source={renderIcon(selectedIconString)}
              resizeMode="contain"
              style={styles.addIconImg}
            />
          </View>
          <Text style={[styles.generalText, styles.iconTitleText]}>
            {renderTitle(selectedIconString)}
          </Text>
          <View style={styles.locationContainer}>
            <Text style={[styles.generalText, styles.propertyText]}>
              Address detected. Feel free to modify it =)
            </Text>
            <View style={styles.editContainer}>
              <TextInput
                onChangeText={(text) => onChangePlaceName(text)}
                value={placeName}
                style={[
                  styles.generalText,
                  styles.iconText,
                  styles.placeNameText,
                ]}
              />
            </View>
          </View>
          <View style={styles.locationContainer}>
            <Text style={[styles.generalText, styles.propertyText]}>
              Provide some details to help even more =)
            </Text>
            <View style={[styles.editContainer, styles.descriptionContainer]}>
              <TextInput
                multiline={true}
                onChangeText={(text) => onChangeDescription(text)}
                value={description}
                style={[
                  styles.generalText,
                  styles.iconText,
                  styles.descriptionText,
                ]}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button]}
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
            <Text style={[styles.generalText, styles.textStyle]}>Send</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  addIconImg: {
    width: 60,
    height: 60,
    // marginBottom: 10,
    // position: "absolute",
    // top: -30,
  },
  addIconImgContainer: {
    borderWidth: 5,
    borderRadius: 40,
    overflow: "hidden",
    borderColor: "#476C7D",
    zIndex: 1,
    top: -40,
    position: "absolute",
    elevation: 15,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "orange",
    // padding: "1%",
  },
  bottomAddIconView: {
    backgroundColor: "#EAF0F2",
    // width: "100%",
    height: 320,
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    // paddingLeft: 50,
    // paddingRight: 50,
    paddingTop: 30,
    paddingBottom: 10,
    // marginRight: 10,
    // marginLeft: 10,
    position: "absolute",
    zIndex: 0,
    width: "100%",
  },
  bottomNavigationView: {
    backgroundColor: "#EAF0F2",
    // width: "100%",
    height: 400,
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    // paddingLeft: 50,
    // paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    // marginRight: 10,
    // marginLeft: 10,
    position: "relative",
    zIndex: 0,
  },
  button: {
    // borderRadius: 20,
    backgroundColor: "#75B0AF",
    alignSelf: "center",
    marginTop: 15,
    // marginBottom: 5,
    height: "15%",
    borderRadius: 10,
    justifyContent: "center",
    elevation: 3,
    width: "20%",
  },
  buttonsContainer: {
    flex: 3,
    flexWrap: "wrap",
    flexDirection: "row",
    // backgroundColor: "blue",
    marginTop: 20,

    justifyContent: "center",
    alignItems: "center",
    width: 400,
  },
  closeIconContainer: {
    position: "absolute",
    right: '5%',
    top: '5%',
  },
  closeIconImg: {
    width: 20,
    height: 20,
  },
  descriptionContainer: {
    height: 60,
  },
  descriptionText: {
    backgroundColor: "#EAF0F2",
    // backgroundColor: "blue",
    borderRadius: 10,
    width: "80%",
    // alignSelf: "flex-start",
    height: "95%",
    textAlignVertical: "top",
    padding: 2,
  },
  editContainer: {
    backgroundColor: "#CFE3E3",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    // borderWidth: 2,
    // borderColor: "#476C7D",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
    padding: 1,
    justifyContent: "space-between",
    elevation: 5,
  },
  generalText: {
    fontFamily: "K2D_600SemiBold",
    color: "#1C333E",
    textAlign:'center',
  },
  handiMarkerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    borderStyle: "solid",
    // borderColor: "blue",
    // borderWidth: 1,
    marginRight: 4,
    marginBottom: 4,
    width: 100,
    position: 'relative',
    zIndex: 0
  },
  header: {
    // fontWeight: "bold",
    fontSize: 20,
    // backgroundColor: "yellow",
    width: "100%",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#dcdddc",
    marginBottom: 1,
  },
  iconImg: {
    width: 60,
    height: 60,
    marginBottom: 3,
    // backgroundColor: "orange",
  },
  iconImgContainer: {
    elevation: 10,
    zIndex: 1,
    position: "relative",
  },
  iconText: {
    paddingLeft: 5,
  },
  iconTitleText: {
    color: "#B7CCD3",
    // backgroundColor: 'yellow'
    width: "100%",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#dcdddc",
    marginBottom: 1,
  },
  locationContainer: {
    // backgroundColor: 'blue',

    width: "100%",
  },
  markerImgWrapper: {
    // position: 'absolute',
    zIndex: 1,
    elevation: 10
  },
  placeNameText: {
    backgroundColor: "#EAF0F2",
    // backgroundColor: "blue",
    borderRadius: 10,
    width: "80%",
    // alignSelf: "flex-start",
    height: 35,
    textAlign: 'left',
  },
  propertyText: {
    paddingLeft: 15,
    fontFamily: "K2D_300Light_Italic",
    fontSize: 10,
    marginBottom: 2,
    marginTop: 10,
    textAlign: 'left'
  },
  textStyle: {
    color: "white",
    // fontWeight: "bold",
    textAlign: "center",
    color: "#DEE7EA",
  },
  title: {
    flex: 1,
  },
});
