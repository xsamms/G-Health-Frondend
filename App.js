import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import AuthNavigation from "./navigation/AuthNavigation";
import DrawNavigation from "./navigation/DrawNavigation";
import AuthContext from "./api/contextAPI/userContext";
import authStorage from "./api/contextAPI/authStorage";
import { NativeBaseProvider } from "native-base";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider } from "react-redux";
import store from "./api/redux/store";

export default function App() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isLoading)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsLoading(true)}
        onError={console.warn}
      />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Provider store={store}>
        <NavigationContainer>
          <ToastProvider>
            <NativeBaseProvider>
              {user ? <DrawNavigation /> : <AuthNavigation />}
            </NativeBaseProvider>
          </ToastProvider>
        </NavigationContainer>
      </Provider>
    </AuthContext.Provider>
  );
}
