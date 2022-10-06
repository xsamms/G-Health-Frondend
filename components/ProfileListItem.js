import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function ProfileListItem({ icon, title }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        {icon}
        <Text style={{ paddingLeft: 20, fontSize: 16 }}>{title}</Text>
      </View>
      <AntDesign name="right" size={24} color="#8c8c8c" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    justifyContent: "space-between",
    paddingBottom: 10,
    marginBottom: 10,
  },
});
export default ProfileListItem;
