import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Cart from "../screens/Cart";
import { useNavigation } from "@react-navigation/native";

function MainHeader({ title }) {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text style={{ fontSize: 24 }}>{title}</Text>
      <View style={styles.cart}>
        <TouchableOpacity
          style={styles.cart}
          onPress={() => navigation.navigate("Cart")}
        >
          <MaterialIcons name="shopping-cart" size={24} color="black" />
          <Text style={styles.cartQty}>{cartTotalQuantity}</Text>
        </TouchableOpacity>
        <MaterialIcons name="notifications" size={24} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: "#ff9f32",
  },
  cart: {
    flexDirection: "row",
  },
  cartQty: {
    top: -10,
    marginEnd: 20,
    color: "#fff",
    fontSize: 16,
    backgroundColor: "#f20c57",
    padding: 2,
    borderRadius: 50,
    marginLeft: -5,
  },
});
export default MainHeader;
