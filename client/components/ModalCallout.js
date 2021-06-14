import { Text, View, StyleSheet, Image, Modal } from "react-native";
import React from "react";

export default function ModalCallout({ modalVisible, setModalVisible }) {
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      animationType='slide'
    >
      <View
        style={styles.centeredView}
      >
        <Text
          style={{
            backgroundColor: "blue",
          }}
        >
          Hello
        </Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  markerContainer: {
    elevation: 20,
  },
  marker: {
    // backgroundColor: 'blue'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  }
});
