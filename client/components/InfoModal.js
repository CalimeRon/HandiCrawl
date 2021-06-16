import { Text, View, StyleSheet, Image, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import {
  renderIcon,
  renderTitle,
  allIcons,
  renderDescr,
} from "../services/iconFactory";
import { BlurView } from "expo-blur";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

export default function InfoModal({ infoModalVisible, setInfoModalVisible }) {
  let infoContainerView = allIcons.map((icon) => {
    return (
      <View key={icon} style={styles.infoContainer}>
        <Image
          style={styles.iconImg}
          source={renderIcon(icon)}
          resizeMode="contain"
        />
        <Text style={[styles.generalText]}>{renderDescr(icon)}</Text>
      </View>
    );
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={infoModalVisible}
      onRequestClose={() => setInfoModalVisible(false)}
    >
      <View style={styles.infoModalView}>{infoContainerView}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  generalText: {
    fontFamily: "K2D_600SemiBold",
    color: "#EAF0F2",
    fontSize: 15,
    // backgroundColor: 'orange',
    width: "80%",
    marginLeft: 8,
    // height: 10,
    // flex: 1,
    flexWrap: "wrap",
    textAlign: "justify",
  },
  iconImg: {
    height: 40,
    width: 40,
    marginLeft: 10,
    // backgroundColor: 'yellow',
  },
  infoModalView: {
    flexDirection: "column",
    borderRadius: 20,
    // width: "100%",
    width: "90%",
    backgroundColor: "#1C333E",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "center",
    position: "absolute",
    top: "15%",
    paddingTop: 10,
    opacity: 0.9,
  },
  infoContainer: {
    // backgroundColor: 'blue',
    flexDirection: "row",
    // flexWrap: 'wrap',
    alignItems: "center",
    justifyContent: "flex-start",
    // flex: 1,
    width: "100%",
    marginBottom: 10,
  },
});
