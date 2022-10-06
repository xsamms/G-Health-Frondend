import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Messages from "../screens/Messages";
import Chat from "../screens/Chat";

const Stack = createNativeStackNavigator();

const ChatNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigation;
