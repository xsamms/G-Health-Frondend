import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";
import AuthApi from "../api/auth";
import { Input, Icon, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import AuthContext from "../api/contextAPI/userContext";
import authStorage from "../api/contextAPI/authStorage";
import { useToast } from "react-native-toast-notifications";

import Checkbox from "expo-checkbox";
import SignUp from "./SignUp";
import Home from "./Home";

const healthCart = require("../assets/health-cart.png");
const healthApp = require("../assets/health-app.png");

const logo = require("../assets/logo.png");

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function SignIn({ navigation }) {
  const [isChecked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = React.useState(false);
  const authContext = useContext(AuthContext);
  const toast = useToast();

  const onSubmit = async ({ email, password }) => {
    const result = await AuthApi.login(email, password);

    if (!result.ok) return setError(true);
    setError(false);
    const user = jwtDecode(result.data.token);

    authContext.setUser(user);
    authStorage.storeToken(result.data.token);
    toast.show("Login successful", {
      type: "success",
      placement: "top",
      duration: 4000,
      offset: 30,
      animationType: "slide-in",
    });
    navigation.navigate("Home");
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.headerImage}>
              <Image
                source={healthCart}
                resizeMode="contain"
                style={styles.healthCart}
              />
              <Image
                source={healthApp}
                resizeMode="contain"
                style={styles.healthApp}
              />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.bold}>Best Online</Text>
              <Text style={styles.bolder}>Medicine</Text>
              <Text style={styles.bold}>Delivery App</Text>
            </View>
          </View>
          <View style={styles.signinContainer}>
            <Image source={logo} resizeMode="contain" style={styles.logo} />
            {error ? (
              <Text
                style={{
                  color: "#f20c57",
                  alignSelf: "center",
                  marginBottom: 10,
                }}
              >
                Invalid email and/or password
              </Text>
            ) : null}
            <View style={styles.signinInput}>
              <Input
                size="lg"
                my="3"
                placeholder="Email Address"
                w="100%"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
              />
              {touched.email && (
                <Text style={{ color: "#f20c57", alignSelf: "center" }}>
                  {errors.email}
                </Text>
              )}

              <Input
                size="lg"
                my="3"
                w={{
                  base: "100%",
                  md: "25%",
                }}
                type={show ? "text" : "password"}
                InputRightElement={
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                    onPress={() => setShow(!show)}
                  />
                }
                placeholder="Password"
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
              />
              {touched.password && (
                <Text style={{ color: "#f20c57", alignSelf: "center" }}>
                  {errors.password}
                </Text>
              )}
              <View style={styles.forgetPass}>
                <View style={styles.remember}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                  />
                  <Text>Remember me</Text>
                </View>

                <TouchableOpacity>
                  <Text>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <Button my="3" size="lg" bgColor="#f20c57" onPress={handleSubmit}>
                Sign In
              </Button>
              <View style={styles.acct}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text style={styles.singupTxt}>Sign Up</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.socialLogin}>
                <Text style={styles.orSign}>Or sign in with</Text>
                <View style={styles.socialbtn}>
                  <TouchableOpacity style={styles.fbk}>
                    <Text style={styles.fbkTxt}>Facebook</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ggl}>
                    <Text style={styles.gglTxt}>Google</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ff9f32",
  },
  topContainer: {
    flex: 1,
    marginTop: 30,
  },
  headerImage: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  healthCart: {
    width: 60,
    height: 60,
  },
  healthApp: {
    width: 60,
    height: 60,
  },
  headerText: {
    justifyContent: "center",
    alignItems: "center",
  },
  bold: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    textTransform: "uppercase",
    textTransform: "uppercase",
  },
  bolder: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
  },
  signinContainer: {
    flex: 2.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  signinInput: {
    marginHorizontal: 20,
  },
  textInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#eae9e9",
    borderRadius: 20,
  },
  tpMargin: {
    marginTop: 30,
  },
  checkbox: {
    margin: 8,
  },
  forgetPass: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  remember: {
    flexDirection: "row",
    alignItems: "center",
  },
  signinBtn: {
    backgroundColor: "#f20c57",
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  signTxt: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  acct: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  singupTxt: {
    paddingLeft: 10,
    color: "#ff9f32",
  },
  orSign: {
    alignSelf: "center",
    marginBottom: 10,
  },
  socialbtn: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  fbk: {
    backgroundColor: "#3a55a2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  fbkTxt: {
    color: "#fff",
    fontSize: 16,
  },
  ggl: {
    backgroundColor: "#ec4235",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  gglTxt: {
    color: "#fff",
    fontSize: 16,
  },
});
export default SignIn;
