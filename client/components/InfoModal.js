//modal to render when you click the little information icon upper right

import { Text, View, StyleSheet, Image, Modal } from "react-native";
import React from "react";
import { renderIcon, allIcons, renderDescr } from "../services/iconFactory";

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
    width: "80%",
    marginLeft: 8,
    flexWrap: "wrap",
    textAlign: "justify",
  },
  iconImg: {
    height: 40,
    width: 40,
    marginLeft: 10,
  },
  infoModalView: {
    flexDirection: "column",
    borderRadius: 20,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 10,
  },
});
