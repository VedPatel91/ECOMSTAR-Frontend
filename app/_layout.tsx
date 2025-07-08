import React from "react";
import StackNavigator from "../navigation/StackNavigator";
import Toast, { BaseToast, ToastConfig } from 'react-native-toast-message';
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from 'react-redux'
import { store } from '../store';
import { UserProvider } from '../context/userContext';

export default function RootLayout() {
  const toastConfig: ToastConfig = {
    error: ({ text1, text2, props }) => (
      toastModifier(text1, text2, props, "red")
    ),
    success: ({ text1, text2, props }) => (
      toastModifier(text1, text2, props, "green")
    ),
  };

  const toastModifier = (text1: any, text2: any, props: any, color: any) => {
    return (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: color,
          backgroundColor: "#fff",
          borderRadius: 8,
        }}
        text1={text1}
        text2={text2}
        text1Style={{ fontSize: 16, fontWeight: "bold", color: "black" }}
        text2Style={{ fontSize: 14, color: "gray" }}
        renderTrailingIcon={() => (
          <TouchableOpacity onPress={() => Toast.hide()} style={{ marginRight: 10 }}>
            <AntDesign name="close" size={20} color="black" />
          </TouchableOpacity>
        )}
      />
    )
  };

  return (
    <Provider store={store}>
      <UserProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StackNavigator />
          <Toast config={toastConfig} />
        </GestureHandlerRootView>
      </UserProvider>
    </Provider>
  );
}
