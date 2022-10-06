import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

function Symptom(props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text>Symptom</Text>
      </View>
      <View></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default Symptom;
