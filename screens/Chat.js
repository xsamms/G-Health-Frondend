import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../api/contextAPI/userContext";
import authStorage from "../api/contextAPI/authStorage";
import { Header } from "react-navigation-stack";
import apiClient from "../api/client";
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import io from "socket.io-client";
let socket, sender, receiver;

function Chat(props) {
  const { user, setUser } = useContext(AuthContext);
  const [chatId, setChatId] = useState(props.route.params.chatId);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const getMessages = async () => {
    console.log(chatId);
    try {
      const tokes = await authStorage.getToken();

      if (tokes) {
        apiClient.headers["Authorization"] = `Bearer ${tokes}`;
      }

      const { data } = await apiClient.get(`/message/${chatId}`);

      data.map((c) => {
        const receiverId = c.chat.users.filter((r) => {
          return r !== c.sender._id;
        });
        sender = c.sender._id;
        receiver = receiverId[0];
        console.log(c._id);
        const senderMessage = {
          _id: c._id,
          text: c.content,
          createdAt: c.createdAt,
          user: {
            _id: receiverId[0],
            name: user.fullname,
            avatar: user.profilepicture,
          },
        };
        const receiverMessage = {
          _id: c._id,
          text: c.content,
          createdAt: c.createdAt,
          user: {
            _id: c.sender._id,
            avatar: user.profilepicture,
          },
        };

        if (senderMessage.createdAt > receiverMessage.createdAt) {
          setMessages((prevState) =>
            GiftedChat.append(prevState, senderMessage)
          );
        } else {
          setMessages((prevState) =>
            GiftedChat.append(prevState, receiverMessage)
          );
        }
      });
      socket.emit("join chat", sender);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    socket = io("http://10.0.2.2:5002");
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      setMessages((prevState) =>
        GiftedChat.append(prevState, newMessageRecieved)
      );
      //   if (
      //     !selectedChatCompare || // if chat is not selected or doesn't match current chat
      //     selectedChatCompare._id !== newMessageRecieved.chat._id
      //   ) {
      //     if (!notification.includes(newMessageRecieved)) {
      //       setNotification([newMessageRecieved, ...notification]);
      //       setFetchAgain(!fetchAgain);
      //     }
      //   } else {
      //     setMessages([...messages, newMessageRecieved]);
      //   }
    });
  });

  const onSend = async (messages) => {
    // console.log(messages);

    try {
      const tokes = await authStorage.getToken();

      if (tokes) {
        apiClient.headers["Authorization"] = `Bearer ${tokes}`;
      }

      await apiClient.post("/message", {
        content: messages[0].text,
        chatId: chatId,
      });

      // const newMessage = messages[0].text;
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
    setMessages((prevState) => GiftedChat.append(prevState, messages));
    socket.emit("new message", messages, receiver);
  };

  {
    loading && <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        isTyping={false}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.userId,
          name: user.fullname,
          avatar: user.profilepicture,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default Chat;
