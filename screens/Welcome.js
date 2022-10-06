import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

const background = require("../assets/background2.jpg");
const logo = require("../assets/logo.png");
const bike = require("../assets/dispatch.png");

function Welcome({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
      >
        <Image source={bike} resizeMode="contain" style={styles.bike} />
        <Image source={logo} resizeMode="contain" style={styles.logo} />

        <TouchableOpacity
          style={styles.welcomeButton}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.welcomeText}>Continue</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  bike: {
    width: "100%",
    height: 150,
    marginBottom: 100,
  },
  logo: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 100,
  },
  welcomeButton: {
    backgroundColor: "#eae9e9",
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    width: 200,
    padding: 10,
  },
  welcomeText: {
    color: "#ff9933",
    fontWeight: "bold",
    fontSize: 24,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default Welcome;
