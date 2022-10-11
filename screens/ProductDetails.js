import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import { addToCart } from "../api/redux/slice/cartSlice";
import { useToast } from "react-native-toast-notifications";
import Cart from "../screens/Cart";

function ProductDetails(props) {
  const [item, setItem] = useState(props.route.params.item);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    props.navigation.navigate("Cart");
    toast.show("Item added to Cart", {
      type: "success",
      placement: "top",
      duration: 4000,
      offset: 30,
      animationType: "slide-in",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          style={styles.productsImg}
          source={{ uri: item.productImage.url }}
        />
      </View>
      <View>
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={{ fontSize: 16 }}>{item.shortDescription}</Text>
      </View>
      <View style={{ paddingTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 20,
          }}
        >
          <Text style={styles.productPrice}>Price:</Text>
          <Text style={styles.productPrice}>Select Quantity</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.priceSize}>
            ₦{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity style={{ paddingRight: 20 }}>
              <EvilIcons name="minus" size={28} color="black" />
            </TouchableOpacity>
            <Text style={styles.qty}>1</Text>
            <TouchableOpacity style={{ paddingLeft: 20 }}>
              <EvilIcons name="plus" size={28} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Button
        my="5"
        size="lg"
        bgColor="#f20c57"
        onPress={() => handleAddToCart(item)}
      >
        Add To Cart
      </Button>
      <View style={{ paddingBottom: 40 }}>
        <Text style={styles.productPrice}>Product Description</Text>
        <Text style={{ fontSize: 16 }}>{item.longDescription}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  productsImg: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  productPrice: {
    fontWeight: "600",
    fontSize: 20,
  },
  priceSize: {
    fontSize: 18,
    fontWeight: "400",
  },
  qty: {
    fontSize: 18,
    fontWeight: "400",
  },
});
export default ProductDetails;
