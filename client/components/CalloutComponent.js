// import { Text, View, StyleSheet, Image } from "react-native";
// import React from "react";
// import { renderIcon, renderTitle } from "../services/iconFactory";
// import { WebView } from "react-native-webview";
// export default function CalloutComponent({ coordItem }) {
//   // console.log("coordite", coordItem);

// //TODO: Still trying to make this work. the image DOESNT RENDER !!
//   return (
//     <View style={styles.bubble}>
//       <View style={styles.topBubble}>
//         <View style={styles.bubbleIcon}>
          
//           <Text style={{backgroundColor: 'orange', display: 'flex', flexDirection:'column', height: 30, justifyContent: 'flex-start'}}>
//           <Image
//               source={renderIcon(coordItem.icon)}
//               style={{height: 30, width: 30}}
//               resizeMode="cover" />
//           </Text>  

//           <Text>After image</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   bubble: {
//     backgroundColor: "#f3f3f3",
//     width: 300,
//     height: 250,
//     borderRadius: 10,
//     padding: 10,
//     borderColor: "#A8EBF4",
//     borderWidth: 5,
//     flexDirection: "column",
//     // alignItems: 'center',
//   },
//   topBubble: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "blue",
//   },
//   baseText: {
//     fontSize: 20,
//   },
//   bubbleTitle: {
//     fontFamily: "K2D_800ExtraBold",
//   },
//   bubbleDescription: {
//     fontFamily: "K2D_600SemiBold",
//   },
//   bubbleIcon: {
//     backgroundColor: "grey",
//     flexDirection: "row",
//     height: 40,
//   },
//   iconImg: {
//     width: 10,
//     height: 10,
//     backgroundColor: "orange",
//     flex: 1,
//   },
// });
