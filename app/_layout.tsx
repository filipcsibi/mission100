import AppNavigator from "@/src/navigation/navigators/AppNavigator";
import { UserProvider } from "@/src/user/UserContext";
import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
}
