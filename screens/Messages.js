import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import authStorage from "../api/contextAPI/authStorage";
import AuthContext from "../api/contextAPI/userContext";
import apiClient from "../api/client";

import AdminList from "../components/messages/AdminList";
import MessageList from "../components/messages/MessageList";

function Messages({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [admins, setAdmins] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    getAdmins();
    getChats();
  }, []);

  const getAdmins = async () => {
    try {
      const token = await authStorage.getToken();
      if (token) {
        apiClient.headers["Authorization"] = `Bearer ${token}`;
      }

      const { data } = await apiClient.get("/auth/adminUsers/");

      setAdmins(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getChats = async () => {
    try {
      const token = await authStorage.getToken();
      if (token) {
        apiClient.headers["Authorization"] = `Bearer ${token}`;
      }

      const { data } = await apiClient.get("/chat");

      setChatMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleCreateChat = async (id) => {
    try {
      const token = await authStorage.getToken();
      if (token) {
        apiClient.headers["Authorization"] = `Bearer ${token}`;
      }

      const { data } = await apiClient.post("/chat/", { userId: id });
      if (data.length == 0) return;
      if (!chatMessages.find((c) => c._id === data._id))
        setChatMessages([data, ...chatMessages]);

      navigation.navigate("Chat", { chatId: data._id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {user.adminUser && (
        <View style={styles.admin}>
          <Text style={{ marginBottom: 10, fontWeight: "700", fontSize: 16 }}>
            Online specialist
          </Text>
          <ScrollView horizontal={true}>
            {admins.map((ad) => {
              return (
                <TouchableOpacity
                  key={ad._id}
                  onPress={() => HandleCreateChat(ad._id)}
                >
                  <AdminList
                    image={{ uri: ad.profilePicture }}
                    name={ad.fullname}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {user.adminUser &&
        (user.adminUser && chatMessages.length == 0 ? (
          <Text>You have no chat message yet!</Text>
        ) : (
          chatMessages.map((u) => {
            let chatUsers = u.users
              .map((users) => users)
              .filter((obj) => obj._id !== user.userId);
            return chatUsers.map((ch) => {
              return (
                <TouchableOpacity
                  key={ch.userId}
                  onPress={() => HandleCreateChat(ch._id)}
                >
                  <MessageList
                    image={{ uri: ch.profilePicture }}
                    name={ch.fullname}
                    statusMessage={ch.email}
                    time={ch.createdAt}
                  />
                </TouchableOpacity>
              );
            });
          })
        ))}

      {!user.adminUser &&
        (!user.adminUser && chatMessages.length == 0 ? (
          <ScrollView>
            {admins.map((i) => {
              return (
                <TouchableOpacity
                  key={i.userId}
                  onPress={() => HandleCreateChat(i._id)}
                >
                  <MessageList
                    image={{ uri: i.profilePicture }}
                    name={i.fullname}
                    statusMessage={i.email}
                    time={i.createdAt}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          chatMessages.map((pu) => {
            let chatUsers = pu.users
              .map((users) => users)
              .filter((obj) => obj._id !== user.userId);
            return chatUsers.map((chu) => {
              return (
                <TouchableOpacity
                  key={chu.userId}
                  onPress={() => HandleCreateChat(chu._id)}
                >
                  <MessageList
                    image={{ uri: chu.profilePicture }}
                    name={chu.fullname}
                    statusMessage={chu.email}
                    time={chu.createdAt}
                  />
                </TouchableOpacity>
              );
            });
          })
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff",
  },
  admin: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
});
export default Messages;
