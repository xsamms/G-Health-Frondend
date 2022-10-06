import * as SecureStore from "expo-secure-store";

const key = "cartItem";

const storeCartItem = async (cartItem) => {
  try {
    await SecureStore.setItemAsync(key, cartItem);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getCartItem = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

// const getUser = async () => {
//   const token = await getToken();
//   return token ? jwtDecode(token) : null;
// };

const removeCartItem = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

export default { removeCartItem, storeCartItem, getCartItem };
