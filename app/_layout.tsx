import AppNavigator from "@/src/navigation/navigators/AppNavigator";
import { UserProvider } from "@/src/user/UserContext";
import React from "react";

export default function App() {
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
}
