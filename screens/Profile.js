import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import authStorage from "../api/contextAPI/authStorage";
import AuthContext from "../api/contextAPI/userContext";
import ProfileListItem from "../components/ProfileListItem";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

function Profile(props) {
  const { user, setUser } = useContext(AuthContext);

  const handleLogOut = () => {
    setUser(null);
    authStorage.removeToken();
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={{ uri: user.profilepicture }}
          style={{ width: 80, height: 80, borderRadius: 50 }}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {user.fullname}
          </Text>
          <Text style={{ fontSize: 16 }}>{user.email}</Text>
        </View>
        <Button title="Edit" color="#f20c57" />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity>
          <ProfileListItem
            icon={<Feather name="shopping-cart" size={24} color="#8c8c8c" />}
            title="My Order"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ProfileListItem
            icon={<AntDesign name="hearto" size={24} color="#8c8c8c" />}
            title="Wishlist"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ProfileListItem
            icon={
              <MaterialCommunityIcons
                name="account-injury-outline"
                size={24}
                color="#8c8c8c"
              />
            }
            title="My Prescription"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ProfileListItem
            icon={<MaterialIcons name="payment" size={24} color="#8c8c8c" />}
            title="Payment Methods"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ProfileListItem
            icon={
              <MaterialIcons name="add-location" size={24} color="#8c8c8c" />
            }
            title="Your Address"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ProfileListItem
            icon={
              <FontAwesome5 name="user-friends" size={24} color="#8c8c8c" />
            }
            title="Invite Friends"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ProfileListItem
            icon={
              <MaterialCommunityIcons
                name="chart-histogram"
                size={24}
                color="#8c8c8c"
              />
            }
            title="Payment History"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ProfileListItem
            icon={<FontAwesome5 name="key" size={24} color="#8c8c8c" />}
            title="Change Password"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogOut}>
          <ProfileListItem
            icon={<Feather name="log-out" size={24} color="#8c8c8c" />}
            title="Log Out"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ff9f32",
  },
  topContainer: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 9,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
});
export default Profile;
