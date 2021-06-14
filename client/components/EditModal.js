import {
  Text,
  View,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React from "react";
import { renderIcon, renderTitle } from "../services/iconFactory";
const iconDimension = 50;

export default function ModalCallout({
  modalVisible,
  setModalVisible,
  currentCallout,
}) {
  if (!currentCallout) return null;
  console.log("in modal", currentCallout);
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      animationType="slide"
      // style={{  margin: 0, alignItems: 'center', justifyContent: 'center' }}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modal}
          onPress={() => console.log("do nothing")}
          activeOpacity={1}
        >
          <View style={styles.bubble}>
            <View style={styles.iconImgContainer}>
              <Image
                source={renderIcon(currentCallout.icon)}
                style={styles.generalIcon}
              />
            </View>
            <View style={styles.thumbsContainer}>
              <Image
                source={require("../assets/thumbsup.png")}
                style={[styles.generalIcon, styles.thumbsIcon]}
                resizeMode="contain"
              />
              <Text style={[styles.generalText, styles.scoreText]}>
                {currentCallout.score}
              </Text>
              <Image
                source={require("../assets/thumbsdown.png")}
                style={[styles.generalIcon, styles.thumbsIcon]}
                resizeMode="contain"
              />
            </View>
            <View style={styles.iconTitle}>
              <Text style={[styles.generalText, styles.iconTitleText]}>
                {renderTitle(currentCallout.icon)}
              </Text>
            </View>
            <View style={styles.editBubble}>
              <Image
                source={require("../assets/trash.png")}
                style={[styles.trashIcon]}
                resizeMode="contain"
              />
              <Image
                source={require("../assets/edit.png")}
                style={[styles.trashIcon, styles.editIcon]}
                resizeMode="contain"
              />
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
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bubble: {
    flexDirection: "column",
    borderRadius: 20,
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#EAF0F2",
    paddingTop: "4%",
    borderRadius: 20,
    paddingLeft: "1%",
    paddingRight: "1%",
    alignItems: "center",
    alignSelf: "center",
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

    // backgroundColor: "#D8E3E8",
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
    top: -45,
    position: "relative",
    elevation: 15,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "orange",
    // padding: "1%",
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    height: 220,
  },
  placeNameText: {
    fontSize: 20,
    fontFamily: "K2D_800ExtraBold",
    textAlign: "center",
  },
  scoreText: {
    fontSize: 30,
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
