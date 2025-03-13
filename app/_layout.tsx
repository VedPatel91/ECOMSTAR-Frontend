import React from "react";
import StackNavigator from "../navigation/StackNavigator";
import Toast, { BaseToast, ToastConfig } from 'react-native-toast-message';
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function RootLayout() {
  const toastConfig: ToastConfig = {
    error: ({ text1, text2, props }) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "red",
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
    ),
  };

  return (
    <>
      <StackNavigator />
      <Toast config={toastConfig} />
    </>
  );
}
