import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

function MessageList({ image, name, statusMessage, time }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{ width: 80, height: 80, marginEnd: 10 }}
          source={image}
        />
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontWeight: "600", marginBottom: 5 }}>{name}</Text>
          <Text>{statusMessage}</Text>
        </View>
      </View>
      <Text>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    backgroundColor: "#fff",
    padding: 10,
  },
});
export default MessageList;
