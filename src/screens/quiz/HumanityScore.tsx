import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { QuizStackParamList } from "@/src/navigation/routes/types";
import * as Haptics from "expo-haptics";

const HumanityScore = () => {
  const navigation = useNavigation<NavigationProp<QuizStackParamList>>();
  const Logo = require("../../../assets/images/mission100logo.jpeg");
  const [score, setScore] = useState<number>(0);
  const [circleColor, setCircleColor] = useState("#FF0000");
  const triggerHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Ultra-short feedback
  };
  const bubbleAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bubbleAnimation, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bubbleAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const scoreInterval = setInterval(() => {
      setScore((prev) => {
        const newScore = prev < 100 ? prev + 1 : 100;
        updateCircleColor(newScore);
        return newScore;
      });
    }, 100);

    return () => clearInterval(scoreInterval);
  }, []);

  const updateCircleColor = (score: number) => {
    if (score <= 25) {
      setCircleColor("#7E1891");
    } else if (score <= 50) {
      setCircleColor("#E73879");
    } else if (score <= 75) {
      setCircleColor("#F26B0F");
    } else if (score <= 90) {
      setCircleColor("#F26B0F");
    } else {
      setCircleColor("#FCC737");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />

      <Animated.View
        style={[
          styles.scoreCircle,
          {
            backgroundColor: circleColor,
            transform: [{ scale: bubbleAnimation }],
          },
        ]}
      >
        <Text style={styles.scoreText}>{score}</Text>

        <Text style={styles.dayText}>What a day!</Text>
      </Animated.View>

      <Text style={styles.mainText}>
        Your daily Humanity Score guides you to a healthier, longer life
      </Text>

      <Text style={styles.subText}>
        Track your daily actions to see how it affects your Rate of Aging
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("genderselectionscreen");
          triggerHapticFeedback();
        }}
      >
        <Text style={styles.buttonText}>Start Your Journey</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f4a68",
    padding: 16,
  },
  logo: {
    position: "absolute",
    top: -30,
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  scoreCircle: {
    position: "relative",
    top: -20,
    width: 170,
    height: 170,
    borderRadius: 85,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    shadowColor: "#FFD700",
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  scoreText: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 10,
  },
  mainText: {
    fontSize: 19,
    fontWeight: "800",
    textAlign: "center",
    color: "#1eb4e8",
    marginHorizontal: 20,
    marginBottom: 30,
    textShadowColor: "#444444",
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 0 },
  },
  subText: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
    marginHorizontal: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#1eb4e8",
    padding: 24,
    paddingVertical: 20,
    borderRadius: 24,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HumanityScore;
