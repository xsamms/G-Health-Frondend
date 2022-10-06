import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

function AdminList({ image, name }) {
  return (
    <View style={styles.container}>
      <Image style={{ width: 80, height: 80 }} source={image} />
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginEnd: 10,
  },
});
export default AdminList;
