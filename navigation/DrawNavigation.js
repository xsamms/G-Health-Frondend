import * as React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import Tabs from "./Tabs";
import About from "../screens/About";

import MainHeader from "../components/MainHeader";

const Drawer = createDrawerNavigator();

function DrawNavigation(props) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home Page"
        component={Tabs}
        options={{
          headerStyle: { backgroundColor: "#ff9f32" },
          headerTitle: () => <MainHeader title="GleeApp" />,
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          headerStyle: { backgroundColor: "#ff9f32" },
          headerTitle: () => <MainHeader title="About" />,
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawNavigation;
