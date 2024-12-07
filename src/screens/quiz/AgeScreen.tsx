import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  QuizStackParamList,
  RootStackParamList,
} from "@/src/navigation/routes/types";
import * as Haptics from "expo-haptics";

const AgeScreen: React.FC = () => {
  const [age, setAge] = useState(18);
  const navigation = useNavigation<NavigationProp<QuizStackParamList>>();
  const handleAgeChange = (value: number) => {
    setAge(Math.round(value));
  };
  const triggerHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Ultra-short feedback
  };
  const handleConfirm = () => {
    triggerHapticFeedback();

    navigation.navigate("authstack");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Your Age</Text>
      <Text style={styles.ageDisplay}>{age} years old</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={100}
        step={1}
        value={age}
        onValueChange={handleAgeChange}
        minimumTrackTintColor="#1eb4e8"
        maximumTrackTintColor="#0f4a68"
        thumbTintColor="#0f4a68"
      />
      <Text style={styles.instruction}>Slide to adjust your age</Text>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm Age</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f4a68",
    marginBottom: 20,
  },
  ageDisplay: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1eb4e8",
    marginBottom: 30,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  instruction: {
    fontSize: 16,
    color: "#0f4a68",
    marginTop: 10,
    marginBottom: 30,
  },
  confirmButton: {
    backgroundColor: "#0f4a68",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  confirmButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AgeScreen;
