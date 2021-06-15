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
import { renderIcon, renderTitle, allIcons } from "../services/iconFactory";
import { BlurView } from "expo-blur";

export default function IconModal({
  toggleEditToIconSelection,
  setTemporaryHandiMarker,
  iconEditModalScreen,
  temporaryHandiMarker,
  setIconEditModalScreen,
}) {
  console.log("in icon modal");

  const iconButton = allIcons.map((iconString) => {
    return (
      <View style={styles.iconImgContainer} key={iconString}>
        <TouchableOpacity
          key={iconString}
          style={styles.handiMarkerContainer}
          onPress={() => {
            setTemporaryHandiMarker((prev) => {
              return {
                ...prev,
                icon: iconString,
              };
            });
            setIconEditModalScreen(false);
            console.log("modified, ", temporaryHandiMarker);
          }}
        >
          <View style={styles.markerImgWrapper}>
            <Image
              source={renderIcon(iconString)}
              resizeMode="contain"
              style={styles.iconImg}
            />
          </View>
          <Text style={styles.generalText}>{renderTitle(iconString)}</Text>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <Modal
      transparent={true}
      visible={iconEditModalScreen}
      onRequestClose={() => toggleEditToIconSelection()}
      animationType="slide"
    >
      <View style={styles.bubble}>
        <Text style={[styles.generalText, styles.titleText]}>
          Choose your icon
        </Text>
        <View style={styles.iconButtons}>{iconButton}</View>
      </View>
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
  generalText: {
    fontFamily: "K2D_600SemiBold",
    color: "#1C333E",
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
    position: "relative",
    zIndex: 0,
  },
  iconButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "center",
  },
  iconImg: {
    width: 60,
    height: 60,
    marginBottom: 3,
    // backgroundColor: "orange",
  },
  iconText: {
    paddingLeft: 5,
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#dcdddc",
    marginBottom: 1,
    // backgroundColor: 'yellow'
  },
});
