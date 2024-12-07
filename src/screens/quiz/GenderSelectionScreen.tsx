import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ProgressBarAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { QuizStackParamList } from "@/src/navigation/routes/types";

const GenderSelectionScreen = () => {
  const navigation = useNavigation<NavigationProp<QuizStackParamList>>();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const progress = 0.25;

  const femaleIcon = require("../../../assets/images/female.png");
  const maleIcon = require("../../../assets/images/male.png");

  const handleContinue = () => {
    if (selectedGender) {
      navigation.navigate("agescreen");
    } else {
      alert("Please select a gender to continue.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Main Text */}
      <Text style={styles.mainText}>What’s your biological sex?</Text>
      <Text style={styles.subText}>
        Our X and Y chromosomes affect many aspects of our health, aging
        included.
      </Text>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[
            styles.card,
            selectedGender === "female" && styles.selectedCard,
          ]}
          onPress={() => setSelectedGender("female")}
        >
          <Image source={femaleIcon} style={styles.icon} />
          <Text style={styles.cardText}>Female</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            selectedGender === "male" && styles.selectedCard,
          ]}
          onPress={() => setSelectedGender("male")}
        >
          <Image source={maleIcon} style={styles.icon} />
          <Text style={styles.cardText}>Male</Text>
        </TouchableOpacity>
      </View>

      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={progress}
        color="#007BFF"
        style={styles.progressBar}
      />

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
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
  mainText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    color: "#d3d3d3",
    marginHorizontal: 16,
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1a75a3",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    height: 160,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: "#FFD700",
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
    resizeMode: "contain",
  },
  cardText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  progressBar: {
    width: "90%",
    height: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default GenderSelectionScreen;
