import { UserContext, UserContextType } from "@/src/user/UserContext";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";

const AppNavigator: React.FC = () => {
  const { user } = useContext(UserContext) as UserContextType;

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        {user ? <TabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default AppNavigator;
