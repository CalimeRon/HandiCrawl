import { Text, View, StyleSheet, Image, Modal } from "react-native";
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
      <View style={styles.centeredView}>
        <View style={styles.iconImgContainer}>
          <Image
            source={renderIcon(currentCallout.icon)}
            style={styles.generalIcon}
          />
        </View>

        <View style={styles.bubble}>
          <View style={styles.iconTitle}>
            <Text style={styles.generalText}>
              {renderTitle(currentCallout.icon)}
            </Text>
          </View>
          <View style={styles.topBubble}>
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
            </View>
            <Image
              source={renderIcon(currentCallout.icon)}
              style={{ width: 50, height: 50 }}
            />
            <Text>{renderTitle(currentCallout.icon)}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bubble: {
    flexDirection: "column",
    // backgroundColor: "blue",
    borderRadius: 20,
    width: "100%",
    height: '100%',
    position: "absolute",
    backgroundColor: "#D8E3E8",
    paddingTop: "4%",
    borderRadius: 20,
    paddingLeft: "1%",
    paddingRight: "1%",
  },
  bubbleIcon: {
    flexDirection: "column",
    borderColor: "#476C7D",
    borderWidth: 5,
    borderRadius: 10,
  },
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "#476C7D",
    // borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "blue",
    height: 200,
    // padding: "3%",
    width: "90%",
    alignSelf: "center",
    marginTop: "50%",
    // marginLeft: "5%",
    // marginRight: '10%'
  },
  editIcon: {
    width: iconDimension - 30,
    height: iconDimension - 20,
    // position: "relative",
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
  },
  iconImgContainer: {
    borderWidth: 5,
    borderRadius: 40,
    overflow: "hidden",
    borderColor: "#476C7D",
    zIndex: 1,
    top: "-50%",
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
    top: "10%",
    backgroundColor: "yellow",
  },
  locationContainer: {
    flexDirection: "column",
    // alignItems: "center",
    backgroundColor: "yellow",
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
  },
  placeNameText: {
    // alignSelf: "flex-start",
    fontSize: 20,
    fontFamily: "K2D_800ExtraBold",
    backgroundColor: "orange",
    textAlign: 'center',
    // justifyContent: "center",
  },
  topBubble: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
    // backgroundColor: "grey",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
    top: "-4%",
  },
  trashIcon: {
    width: iconDimension - 20,
    height: iconDimension - 20,
    // position: "relative",
    bottom: "1%",
    marginRight: "2%",
  },
});
