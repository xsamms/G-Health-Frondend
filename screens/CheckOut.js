import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import RadioButtonRN from "radio-buttons-react-native";
import { Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Radio } from "native-base";

function CheckOut(props) {
  const [value, setValue] = React.useState("");
  const { totalOrder } = props.route.params;

  const address = [
    {
      label: "Home Address",
    },
    {
      label: "Shipping Address",
    },
  ];

  const payment = [
    {
      label: "Credit Cart",
    },
    {
      label: "Bank Transfer",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={{ paddingVertical: 40 }}>
          <Text style={{ fontWeight: "800", fontSize: 20 }}>
            Delivery Address
          </Text>

          <RadioButtonRN
            data={address}
            selectedBtn={(value) => console.log(value)}
            textStyle={{ fontSize: 16 }}
          />
        </View>
        <View style={{ paddingVertical: 40 }}>
          <Text style={{ fontWeight: "800", fontSize: 20 }}>
            Payment Method
          </Text>

          <RadioButtonRN
            data={payment}
            selectedBtn={(value) => console.log(value)}
            textStyle={{ fontSize: 16 }}
          />
        </View>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              padding: 20,
              backgroundColor: "#f20c57",
              color: "#fff",
              justifyContent: "center",
              textAlign: "center",
              borderRadius: 5,
            }}
          >
            Pay Now: ₦
            {JSON.stringify(totalOrder)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  main: {
    paddingHorizontal: 20,
  },
});
export default CheckOut;
