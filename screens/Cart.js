import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EvilIcons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import {
  getTotals,
  addToCart,
  decreaseCart,
  removeFromCart,
  clearCart,
} from "../api/redux/slice/cartSlice";
import { AntDesign } from "@expo/vector-icons";
import { Button, Icon } from "native-base";
import Home from "./Home";
import cartStorage from "../api/contextAPI/cartStorage";
import CheckOut from "./CheckOut";

function Cart({ navigation }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let shipping = cart.cartItems.length >= 1 ? 2000 : 0;
  let totalOrder =
    cart.cartItems.length >= 1 ? cart.cartTotalAmount + shipping : 0;

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleIncreaseQty = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecreaseQty = (item) => {
    dispatch(decreaseCart(item));
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = (item) => {
    dispatch(clearCart(item));
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.7, paddingHorizontal: 20, paddingBottom: 20 }}>
        <View style={styles.top}>
          <Text>{cart.cartTotalQuantity} items in your Cart</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Main Page")}>
            {cart.cartTotalQuantity >= 1 ? (
              <Text style={styles.shoppingTxt}>+ Add more items</Text>
            ) : (
              <Text style={styles.shoppingTxt}>Start shopping</Text>
            )}
          </TouchableOpacity>
        </View>
        <View>
          {cart.cartItems.length === 0 ? (
            <Text
              style={{
                paddingTop: 30,
                fontSize: 20,
              }}
            >
              Your cart is empty
            </Text>
          ) : (
            <ScrollView>
              {cart.cartItems &&
                cart.cartItems.map((cartItem) => {
                  return (
                    <View key={cartItem._id} style={styles.cartItms}>
                      <Image
                        source={{ uri: cartItem.productImage.url }}
                        style={styles.productsImg}
                      />
                      <View
                        style={{
                          justifyContent: "space-around",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingTop: 15,
                          }}
                        >
                          <Text style={styles.productTtl}>{cartItem.name}</Text>
                          <AntDesign
                            name="delete"
                            size={24}
                            color="black"
                            onPress={() => handleRemove(cartItem)}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            paddingBottom: 15,
                          }}
                        >
                          <Text style={styles.productPcr}>
                            ₦
                            {cartItem.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              paddingStart: 100,
                            }}
                          >
                            <TouchableOpacity
                              style={{ paddingRight: 20 }}
                              onPress={() => handleDecreaseQty(cartItem)}
                            >
                              <EvilIcons name="minus" size={28} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.qty}>
                              {cartItem.cartQuantity}
                            </Text>
                            <TouchableOpacity
                              style={{ paddingLeft: 20 }}
                              onPress={() => handleIncreaseQty(cartItem)}
                            >
                              <EvilIcons name="plus" size={28} color="black" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
          )}
        </View>
      </View>
      {cart.cartTotalQuantity >= 1 && (
        <View
          style={{
            flex: 0.3,
            paddingHorizontal: 20,
            backgroundColor: "#fff",
          }}
        >
          <View>
            <Text
              style={{ fontWeight: "bold", fontSize: 20, paddingBottom: 10 }}
            >
              Payment Summary:
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 10,
              }}
            >
              <Text style={styles.productTtl}>Order Total</Text>
              <Text style={styles.productPcr}>
                ₦
                {cart.cartTotalAmount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.productTtl}>Shipping (within Lagos)</Text>
              <Text style={styles.productPcr}>
                ₦{shipping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
          </View>
          <View>
            {cart.cartItems && (
              <Button
                my="3"
                size="md"
                bgColor="#a6a6a6"
                onPress={() => handleClearCart(cart.cartItems)}
              >
                Clear Cart
              </Button>
            )}
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={styles.productTtl}>Total</Text>
              <Text style={styles.productPcr}>
                ₦{totalOrder.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
            <View>
              <Button
                bgColor="#f20c57"
                endIcon={
                  <Icon
                    as={AntDesign}
                    name="rightcircleo"
                    color="#fff"
                    size="md"
                  />
                }
                onPress={() =>
                  navigation.navigate("Checkout", { totalOrder: totalOrder })
                }
              >
                Checkout
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  top: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  productsImg: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  cartItms: {
    flexDirection: "row",
    alignContent: "center",
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#d9d9d9",
  },
  productTtl: {
    fontWeight: "400",
    fontSize: 16,
  },
  productPcr: {
    fontSize: 16,
  },
  shoppingTxt: {
    fontSize: 16,
    color: "#f20c57",
  },
});

export default Cart;
