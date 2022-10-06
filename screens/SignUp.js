import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Input, Icon, Button } from "native-base";
import { useToast } from "react-native-toast-notifications";
import { MaterialIcons } from "@expo/vector-icons";
import AuthApi from "../api/auth";
import { Formik } from "formik";
import * as Yup from "yup";

import SignIn from "./SignIn";

const healthCart = require("../assets/health-cart.png");
const healthApp = require("../assets/health-app.png");

const logo = require("../assets/logo.png");

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required().label("Full Name"),
  email: Yup.string().required().email().label("Email"),
  phonenumber: Yup.string().required().label("Phone Number"),
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .label("Password"),
  address: Yup.string().label("Address"),
  city: Yup.string().label("City"),
});

function SignUp({ navigation }) {
  const [error, setError] = useState(false);
  const [show, setShow] = React.useState(false);
  const toast = useToast();

  const onSubmit = async ({
    fullname,
    email,
    phonenumber,
    password,
    address,
    city,
  }) => {
    const result = await AuthApi.register(
      fullname,
      email,
      phonenumber,
      password,
      address,
      city
    );

    if (!result.ok) {
      if (result.data) {
        setError(result.data);
        console.log(result.data);
      } else {
        toast.show("Registration failed, please try again", {
          type: "danger",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        setError("An enexpected error occurred.");
        console.log(result);
      }
    }
    setError(false);
    toast.show("Registration successful", {
      type: "success",
      placement: "top",
      duration: 4000,
      offset: 30,
      animationType: "slide-in",
    });
    navigation.navigate("SignIn");
  };

  return (
    <Formik
      initialValues={{
        fullname: "",
        email: "",
        phonenumber: "",
        password: "",
        address: "",
        city: "",
      }}
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
              <Text style={styles.bolder}>Register</Text>
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
                {error}
              </Text>
            ) : null}
            <View style={styles.signinInput}>
              <Input
                size="lg"
                my="3"
                placeholder="Full Name"
                w="100%"
                onChangeText={handleChange("fullname")}
                onBlur={() => setFieldTouched("fullname")}
              />
              {touched.fullname && (
                <Text style={{ color: "#f20c57", alignSelf: "center" }}>
                  {errors.fullname}
                </Text>
              )}

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
                placeholder="Phone Number"
                w="100%"
                keyboardType="numeric"
                onChangeText={handleChange("phonenumber")}
                onBlur={() => setFieldTouched("phonenumber")}
              />
              {touched.phonenumber && (
                <Text style={{ color: "#f20c57", alignSelf: "center" }}>
                  {errors.phonenumber}
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
              <Input
                size="lg"
                my="3"
                placeholder="Address"
                w="100%"
                onChangeText={handleChange("address")}
                onBlur={() => setFieldTouched("address")}
              />
              {touched.address && (
                <Text style={{ color: "#f20c57", alignSelf: "center" }}>
                  {errors.address}
                </Text>
              )}

              <Input
                size="lg"
                my="3"
                placeholder="City"
                w="100%"
                onChangeText={handleChange("city")}
                onBlur={() => setFieldTouched("city")}
              />
              {touched.city && (
                <Text style={{ color: "#f20c57", alignSelf: "center" }}>
                  {errors.city}
                </Text>
              )}

              <Button my="3" size="lg" bgColor="#f20c57" onPress={handleSubmit}>
                Sign Up
              </Button>
              <View style={styles.acct}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                  <Text style={styles.singupTxt}>Sign In</Text>
                </TouchableOpacity>
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

  bolder: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
  },
  signinContainer: {
    flex: 4,
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
    marginBottom: 30,
  },
  checkbox: {
    margin: 8,
  },
  forgetPass: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
});
export default SignUp;
