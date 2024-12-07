import { UserContext, UserContextType } from "@/src/user/UserContext";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import React, { useContext } from "react";
import TabNavigator from "./TabNavigator";
import QuizNavigator from "./QuizNavigator";

const AppNavigator: React.FC = () => {
  const { user } = useContext(UserContext) as UserContextType;

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        {user ? <TabNavigator /> : <QuizNavigator />}
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default AppNavigator;
