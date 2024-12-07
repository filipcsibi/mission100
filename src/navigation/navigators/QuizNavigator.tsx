import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QuizStackParamList, RootStackParamList } from "../routes/types";
import HumanityScore from "@/src/screens/quiz/HumanityScore";
import GenderSelectionScreen from "@/src/screens/quiz/GenderSelectionScreen";
import AgeScreen from "@/src/screens/quiz/AgeScreen";
import AuthNavigator from "./AuthNavigator";

const Stack = createNativeStackNavigator<QuizStackParamList>();

const QuizNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="humanityscorescreen" component={HumanityScore} />
      <Stack.Screen
        name="genderselectionscreen"
        component={GenderSelectionScreen}
      />
      <Stack.Screen name="agescreen" component={AgeScreen} />
      <Stack.Screen name="authstack" component={AuthNavigator} />
    </Stack.Navigator>
  );
};

export default QuizNavigator;
