import { BottomSheet } from "react-native-btr";
import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import renderIcon from "../services/iconRendering";

export default function AddIconBottomSheet({
  iconEvent,
  visible,
  setVisible,
  setCoords,
  coords,
}) {
  console.log(iconEvent);

  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
    >
      <View style={styles.bottomNavigationView}>
        <Text>So you want to add an icon buddy ? </Text>
        <Text>hihihi</Text>
        <View style={{ flexWrap: "wrap" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              setCoords([
                ...coords,
                {
                  _id:
                    iconEvent.coordinate.latitude +
                    iconEvent.coordinate.longitude,
                  placeName: "test",
                  icon: "warning",
                  latitude: iconEvent.coordinate.latitude,
                  longitude: iconEvent.coordinate.longitude,
                  description: "testouille",
                },
              ]);
              setVisible(false)
            }}
          >
            <Image
              source={renderIcon("warning")}
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Button title="cancel" onPress={() => setVisible(false)}></Button>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
