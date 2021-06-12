import { BottomSheet } from 'react-native-btr';
import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AddIconBottomSheet ({ iconEvent, visible, setVisible }) {
  
  console.log(iconEvent)

  return (
    <BottomSheet
    visible={visible}
    onBackButtonPress={() => setVisible(false)}
    onBackdropPress={() => setVisible(false)}
  >
    <View style={styles.bottomNavigationView}>
      <Text>So you want to add an icon buddy ? </Text>
      </View>
      <Button title="cancel" onPress={() => setVisible(false)}></Button>
  </BottomSheet>
)
}

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});