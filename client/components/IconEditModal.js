//modal called when you want to edit the icon ppic
import {
  Text,
  View,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { renderIcon, renderTitle, allIcons } from "../services/iconFactory";

export default function IconModal({
  setTemporaryHandiMarker,
  iconEditModalScreen,
  temporaryHandiMarker,
  setIconEditModalScreen,
}) {
  //render each icon from the icon factory
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
      onRequestClose={() => setIconEditModalScreen(false)}
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
    width: "90%",
    height: 400,
    position: "absolute",
    bottom: "30%",
    backgroundColor: "#EAF0F2",
    paddingTop: "0%",
    borderRadius: 20,
    alignSelf: "center",
    elevation: 23,
  },
  generalText: {
    fontFamily: "K2D_600SemiBold",
    color: "#1C333E",
    textAlign: "center",
  },
  handiMarkerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    borderStyle: "solid",
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
  },
});
