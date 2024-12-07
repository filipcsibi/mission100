import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "@/src/screens/auth/LandingScreen";
import LoginScreen from "@/src/screens/auth/LoginScreen";
import RegisterScreen from "@/src/screens/auth/RegisterScreen";
import { MainStackParamList } from "../routes/types";
import QuizApp from "@/src/screens/quiz-app/quiz-app";
import DetailsScreen from "@/src/screens/details-screen/details-screen";

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="homescreen" component={QuizApp} />
      <Stack.Screen name="detailscreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
};
export default MainScreenNavigator;
