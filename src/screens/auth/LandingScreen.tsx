import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { RootStackParamList } from "../../navigation/routes/types";
const { width, height } = Dimensions.get("window");

const LandingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const Logo = require("../../../assets/images/mission100logo.jpeg");
  useEffect(() => {
    console.log("authmounted");
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topflex}>
        <Text style={styles.irclr}>Mission100</Text>
      </View>

      <View style={styles.bottomflex}>
        <View
          style={{
            flex: 0.8,
          }}
        >
          <Text style={styles.heyyou}>Welcome!</Text>
          <Text style={styles.quote}>Do you want to live 100 years?</Text>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => navigation.navigate("registerscreen")}
          >
            <Text style={styles.buttontext}>ABSOLUTELY!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable2}>
            <Text style={styles.learnmore}>Learn More</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            flex: 0.2,
          }}
        >
          <Text
            style={styles.login}
            onPress={() => navigation.navigate("loginscreen")}
          >
            I already have an account.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "white",
  },
  buttontext: {
    color: "#0f4a68",
    fontWeight: "bold",
    fontSize: 24,
    fontFamily: "Courier",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#A61515",
  },

  logo: {
    width: width * 0.2,
    height: height * 0.1,
  },
  topflex: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  irclr: {
    fontSize: 32,
    color: "#0f4a68",
    fontWeight: "bold",
    fontFamily: "Courier",
  },
  bottomflex: {
    backgroundColor: "#1eb4e8",
    flex: 0.6,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 24,
    paddingBottom: 0,
    justifyContent: "space-between",
  },
  touchable: {
    backgroundColor: "white",
    height: height * 0.07,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "center",
  },
  touchable2: {
    backgroundColor: "#0f4a68",
    height: height * 0.07,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "center",
  },
  quote: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    fontFamily: "Courier",
    marginBottom: 32,
    textAlign: "center",
  },
  login: {
    color: "white",
    alignSelf: "center",
    fontFamily: "Courier",
    fontSize: 16,
    fontWeight: "bold",
  },
  learnmore: {
    color: "white",
    alignSelf: "center",
    fontFamily: "Courier",
    fontSize: 24,
    fontWeight: "bold",
  },
  heyyou: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    fontFamily: "Courier",
    textAlign: "center",
    marginVertical: 32,
  },
});

export default LandingScreen;
