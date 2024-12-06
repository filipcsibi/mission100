import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowBack } from "@/assets/svgs";

const { width, height } = Dimensions.get("window");

const GoBackButton: React.FC = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
      <ArrowBack width={32} height={32} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: width * 0.1,
  },
});

export default GoBackButton;
