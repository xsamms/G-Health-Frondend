import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MainHeader from "../components/MainHeader";

import Home from "../screens/Home";
import Messages from "../screens/Messages";
import Profile from "../screens/Profile";
import Symptom from "../screens/Symptom";
import ProductDetails from "../screens/ProductDetails";

import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ProductNavigation from "./ProductNavigation";
import ChatNavigation from "./ChatNavigation";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={ProductNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),

          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Symptom"
        component={Symptom}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="local-pharmacy" size={24} color={color} />
          ),
          // headerTitle: () => <MainHeader />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="message1" size={24} color={color} />
          ),
          headerShown: false,
          // headerTitle: () => <MainHeader />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-md" size={24} color={color} />
          ),
          // headerTitle: () => <MainHeader />,

          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
