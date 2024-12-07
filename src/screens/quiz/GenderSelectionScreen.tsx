import { QuizStackParamList } from "@/src/navigation/routes/types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
const width = Dimensions.get("window").width;
const GenderScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<QuizStackParamList>>();

  const [selectedGender, setSelectedGender] = useState<
    "male" | "female" | null
  >(null);

  const handleGenderSelect = (gender: "male" | "female") => {
    setSelectedGender(gender);
  };

  const handleConfirm = () => {
    navigation.navigate("agescreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose your gender</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === "male" && styles.selectedGender,
          ]}
          onPress={() => handleGenderSelect("male")}
        >
          <Image
            source={require("../../../assets/images/male.png")}
            style={styles.genderIcon}
          />
          <Text style={styles.genderText}>Man</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === "female" && styles.selectedGender,
          ]}
          onPress={() => handleGenderSelect("female")}
        >
          <Image
            source={require("../../../assets/images/female.png")}
            style={styles.genderIcon}
          />
          <Text style={styles.genderText}>Woman</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.confirmButton, !selectedGender && styles.disabledButton]}
        onPress={handleConfirm}
        disabled={!selectedGender}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
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
    marginBottom: 40,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 40,
  },
  genderButton: {
    alignItems: "center",
    padding: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1eb4e8",
  },
  selectedGender: {
    backgroundColor: "#1eb4e8",
  },
  genderIcon: {
    width: width * 0.2,
    height: width * 0.25,
    marginBottom: 10,
    resizeMode: "contain",
  },
  genderText: {
    fontSize: 18,
    color: "#0f4a68",
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#0f4a68",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  confirmButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GenderScreen;
