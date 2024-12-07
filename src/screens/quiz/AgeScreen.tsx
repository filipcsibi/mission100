import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { QuizStackParamList } from "@/src/navigation/routes/types";

export default function AgeScreen() {
  const navigation = useNavigation<NavigationProp<QuizStackParamList>>();

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>AgeScreen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("authstack")}
        style={{ width: 100, height: 100, backgroundColor: "red" }}
      />
    </View>
  );
}
