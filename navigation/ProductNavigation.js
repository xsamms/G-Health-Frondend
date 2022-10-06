import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import ProductDetails from "../screens/ProductDetails";
import Cart from "../screens/Cart";
import MainHeader from "../components/MainHeader";
import CheckOut from "../screens/CheckOut";

const Stack = createNativeStackNavigator();

const ProductNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main Page"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product Details"
        component={ProductDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckOut}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProductNavigation;
