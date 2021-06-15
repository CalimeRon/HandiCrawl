import {
  Text,
  View,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { renderIcon, renderTitle } from "../services/iconFactory";
import { updateCoord } from "../services/apiServices";

import { BlurView } from "expo-blur";
const iconDimension = 50;

export default function EditModal({
  modalVisible,
  setModalVisible,
  currentCallout,
  editModalScreen,
  setEditModalScreen,
  toggleCalloutToEdit,
  temporaryHandiMarker,
  setTemporaryHandiMarker,
  toggleEditToIconSelection,
  setIconEditModalScreen,
  coords,
  setCoords,
}) {
  if (!currentCallout) return null;
  const myDimensions = useWindowDimensions();
  const screenWidth = myDimensions.width;
  const screenHeight = myDimensions.height;
  function clearEditModal() {
    setTemporaryHandiMarker(null);
  }

  useEffect(() => {
    !temporaryHandiMarker ? setTemporaryHandiMarker(currentCallout) : null;
  }, []);

  console.log("temp handi marker", temporaryHandiMarker);

  console.log("in edit modal", modalVisible, "editmoda ", editModalScreen);
  return (
    <Modal
      transparent={true}
      visible={editModalScreen}
      onRequestClose={() => toggleCalloutToEdit()}
      animationType="slide"
      // style={{  margin: 0, alignItems: 'center', justifyContent: 'center' }}
    >
      <BlurView
        intensity={150}
        style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}
      >
        <View style={styles.bubble}>
          
          <Text style={[styles.generalText, styles.titleText]}>
            Edit Handimarker
          </Text>
          <Text style={[styles.generalText, styles.propertyText]}>
            Edit icon...
          </Text>
          <View style={styles.editContainer}>
            <View style={styles.iconImgContainer}>
              <Image
                source={
                  temporaryHandiMarker
                    ? renderIcon(temporaryHandiMarker.icon)
                    : renderIcon(currentCallout.icon)
                }
                style={styles.generalIcon}
              />
              <Text style={styles.iconText}>
                {renderTitle(currentCallout.icon)}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setIconEditModalScreen(true)}>
              <Image
                source={require("../assets/edit.png")}
                style={[styles.trashIcon, styles.editIcon]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.generalText, styles.propertyText]}>
            Edit location...
          </Text>
          <View style={styles.editContainer}>
            <TextInput
              style={[
                styles.generalText,
                styles.iconText,
                styles.placeNameText,
              ]}
              onChangeText={(text) => {
                console.log(text);
                setTemporaryHandiMarker({
                  ...temporaryHandiMarker,
                  placeName: text,
                });
                console.log("newtemp", temporaryHandiMarker);
              }}
              onFocus={(whatisit) => console.log("in focus", whatisit)}
            >
              {temporaryHandiMarker
                ? temporaryHandiMarker.placeName
                : currentCallout.placeName}
            </TextInput>
          </View>

          <Text style={[styles.generalText, styles.propertyText]}>
            Edit description...
          </Text>
          <View style={[styles.editContainer, styles.descriptionContainer]}>
            <TextInput
              multiline={false}
              style={[
                styles.generalText,
                styles.iconText,
                styles.placeNameText,
              ]}
              onChangeText={(text) => {
                console.log(text);
                setTemporaryHandiMarker({
                  ...temporaryHandiMarker,
                  description: text,
                });
                console.log("newtemp", temporaryHandiMarker);
              }}
              onFocus={(whatisit) => console.log("in focus", whatisit)}
            >
              {temporaryHandiMarker
                ? temporaryHandiMarker.description
                : currentCallout.description}
            </TextInput>
          </View>
          <View style={styles.sendButton}>
            <TouchableOpacity
              onPress={() => {
                console.log("sending update maybe");
                updateCoord(temporaryHandiMarker);
                setCoords((prevCoords) => {
                  const newCoords = prevCoords.map(coordItem => {
                    if (coordItem.id === temporaryHandiMarker.id) return temporaryHandiMarker;
                    else return coordItem;
                  })
                  return newCoords;
                })
                setTemporaryHandiMarker(null);
                setModalVisible(false);
                setEditModalScreen(false);
              }}
            >
              <Text style={[styles.generalText, styles.sendButtonUpdate]}>
                Send Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bubble: {
    flexDirection: "column",
    borderRadius: 20,
    // width: "100%",
    width: "90%",
    height: 310,
    // height: "100%",
    position: "absolute",
    bottom: "30%",
    backgroundColor: "#EAF0F2",
    paddingTop: "0%",
    borderRadius: 20,
    // paddingLeft: "1%",
    // paddingRight: "1%",
    // alignItems: "center",
    alignSelf: "center",
    // justifyContent: "center",
    // zIndex: 1,
    elevation: 23,
    // backgroundColor: "orange",
  },
  bubbleIcon: {
    flexDirection: "column",
    borderColor: "#476C7D",
    borderWidth: 5,
    borderRadius: 10,
  },
  descriptionContainer: {
    height: 60,
  },
  descriptionText: {
    backgroundColor: "#EAF0F2",
    borderRadius: 10,
    width: "80%",
    alignSelf: "flex-start",
    height: "100%",
    textAlignVertical: "top",
  },
  editBubble: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
    alignItems: "flex-end",
    position: "absolute",
    zIndex: 1,
    top: 24,
    right: 10,
    alignSelf: "flex-end",
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
    marginBottom: 6,
    padding: 1,
    justifyContent: "space-between",
    elevation: 5,
  },
  editIcon: {
    width: iconDimension - 30,
    height: iconDimension - 20,
    bottom: "1%",
    marginRight: "2%",
  },
  generalIcon: {
    width: iconDimension,
    height: iconDimension,

    // backgroundColor: "#D8E3E8",
  },
  generalText: {
    fontFamily: "K2D_600SemiBold",
    color: "#1C333E",
  },
  iconImgContainer: {
    // borderWidth: 0.5,
    // borderRadius: 40,
    // borderColor: "#476C7D",
    // overflow: "hidden",
    // zIndex: 1,
    // top: -120,
    // position: "relative",
    // elevation: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: "yellow",
    // padding: "1%",
  },
  iconText: {
    paddingLeft: 5,
  },
  iconTitle: {
    alignSelf: "center",
    zIndex: 1,
    position: "absolute",
    top: 23,
    // backgroundColor: "yellow",
  },
  iconTitleText: {
    color: "#B7CCD3",
  },
  locationContainer: {
    flexDirection: "column",
    // alignItems: "center",
    // backgroundColor: "yellow",
    // justifyContent: 'center',
  },
  locationTop: {
    // backgroundColor: 'orange',
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: "1%",
  },
  middleBubble: {
    flex: 4,
    // backgroundColor: "blue",
    padding: "1%",
    zIndex: 0,
    top: 80,
    width: "100%",
    position: "absolute",
    borderTopColor: "#dcdddc",
    borderTopWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {},
  placeNameText: {
    // fontSize: 20,
    // fontFamily: "K2D_800ExtraBold",
    // textAlign: "center",
    backgroundColor: "#EAF0F2",
    borderRadius: 10,
    width: "80%",
    alignSelf: "flex-start",
    height: "100%",
    // flexWrap: 'wrap',
    // flex : 1,
    // textAlignVertical: "top",
  },
  propertyText: {
    paddingLeft: 15,
    fontFamily: "K2D_300Light_Italic",
    fontSize: 10,
  },
  scoreText: {
    fontSize: 30,
  },
  sendButton: {
    backgroundColor: "#75B0AF",
    alignSelf: "center",
    marginTop: 5,
    // marginBottom: 5,
    height: "15%",
    borderRadius: 10,
    justifyContent: "center",
    elevation: 3,
  },
  sendButtonUpdate: {
    margin: 4,
    color: "#DEE7EA",
    paddingLeft: 2,
    paddingRight: 2,
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#dcdddc",
    marginBottom: 1,

    // backgroundColor: 'yellow'
  },
  thumbsContainer: {
    overflow: "hidden",
    flexDirection: "row",
    zIndex: 1,
    left: 10,
    top: 10,
    flex: 1,
    position: "absolute",
    // elevation: 15,
    justifyContent: "space-between",
    alignItems: "center",
    width: "30%",
  },
  thumbsIcon: {
    width: "30%",
  },
  trashIcon: {
    width: iconDimension - 20,
    height: iconDimension - 20,
    // position: "relative",
    // bottom: "1%",
    marginRight: "20%",
  },
});
