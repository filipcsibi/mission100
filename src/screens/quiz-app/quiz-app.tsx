import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import styles from "./style";
import Header from "./molecules/header/header";
import Rewards from "./molecules/rewards/rewards";
import CategoryList from "./template/category-list/category-list";
const QuizApp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {/* <Rewards/> */}
      <CategoryList />
    </SafeAreaView>
  );
};

export default QuizApp;
