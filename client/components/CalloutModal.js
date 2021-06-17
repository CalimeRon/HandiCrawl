//this is the first modal that appears when you click on
//an existing marker

import {
  Text,
  View,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { renderIcon, renderTitle } from "../services/iconFactory";
import { deleteCoord } from "../services/apiServices";
import ThumbComponent from "./ThumbComponent";
const iconDimension = 50;

export default function CalloutModal({
  markerDetailsModalVisible,
  setMarkerDetailsModalVisible,
  currentCallout,
  toggleCalloutToEdit,
  setCoords,
}) {

  return (
    <Modal
      transparent={true}
      visible={markerDetailsModalVisible}
      onRequestClose={() => setMarkerDetailsModalVisible(false)}
      animationType="slide"
      // style={{  margin: 0, alignItems: 'center', justifyContent: 'center' }}
    >
      <View style={styles.bubble}>
        <View style={styles.iconImgContainer}>
          <Image
            source={renderIcon(currentCallout.icon)}
            style={styles.generalIcon}
          />
        </View>

        <ThumbComponent
          currentCallout={currentCallout}
        />

        <View style={styles.iconTitle}>
          <Text style={[styles.generalText, styles.iconTitleText]}>
            {renderTitle(currentCallout.icon)}
          </Text>
        </View>
        {/* 
        trash and edit icon  below. if you press on 
        trash: delete coordinate (not reversible)
        edit: open the edit modal
        */}
        <View style={styles.editBubble}>
          <TouchableOpacity
            onPress={() => {
              deleteCoord(currentCallout);
              setCoords((prev) => {
                return prev.filter((coord) => {
                  return coord.id !== currentCallout.id;
                });
              });
              setMarkerDetailsModalVisible(false);
            }}
          >
            <Image
              source={require("../assets/trash.png")}
              style={[styles.trashIcon]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleCalloutToEdit();
            }}
          >
            <Image
              source={require("../assets/edit.png")}
              style={[styles.trashIcon, styles.editIcon]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.middleBubble}>
          <View style={styles.locationContainer}>
            <Text style={[styles.generalText, styles.placeNameText]}>
              {currentCallout.placeName}
            </Text>
            <Text style={[styles.generalText, styles.descriptionText]}>
              {currentCallout.description}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bubble: {
    flexDirection: "column",
    borderRadius: 20,
    width: "90%",
    height: 200,
    position: "absolute",
    bottom: "35%",
    backgroundColor: "#EAF0F2",
    paddingTop: "4%",
    borderRadius: 20,
    paddingLeft: "1%",
    paddingRight: "1%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    elevation: 23,
  },
  bubbleIcon: {
    flexDirection: "column",
    borderColor: "#476C7D",
    borderWidth: 5,
    borderRadius: 10,
  },
  descriptionText: {
    fontSize: 20,
    fontFamily: "K2D_400Regular_Italic",

    textAlign: "center",
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
  editIcon: {
    width: iconDimension - 30,
    height: iconDimension - 20,
    bottom: "1%",
    marginRight: "2%",
  },
  generalIcon: {
    width: iconDimension,
    height: iconDimension,
  },
  generalText: {
    fontFamily: "K2D_600SemiBold",
    color: "#1C333E",
  },
  iconImgContainer: {
    borderWidth: 5,
    borderRadius: 40,
    overflow: "hidden",
    borderColor: "#476C7D",
    zIndex: 1,
    top: -115,
    elevation: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  iconTitle: {
    alignSelf: "center",
    zIndex: 1,
    position: "absolute",
    top: 23,
  },
  iconTitleText: {
    color: "#B7CCD3",
  },
  locationContainer: {
    flexDirection: "column",
  },
  locationTop: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: "1%",
  },
  middleBubble: {
    flex: 4,
    padding: "1%",
    zIndex: 0,
    top: 60,
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
    fontSize: 20,
    fontFamily: "K2D_800ExtraBold",
    textAlign: "center",
  },
  scoreText: {
    fontSize: 30,
    textAlign: "center",
    width: 30,
  },
  thumbsContainer: {
    flexDirection: "row",
    zIndex: 1,
    left: 5,
    top: 10,
    position: "absolute",
    justifyContent: "space-between",
    alignItems: "center",
    width: "30%",
  },
  thumbsIcon: {
    width: iconDimension - 10,
    height: iconDimension - 10,
  },
  trashIcon: {
    width: iconDimension - 20,
    height: iconDimension - 20,
    marginRight: "20%",
  },
});
