// LoginScreen.tsx
import { Apple, Facebook, Google } from "@/assets/svgs";
import { Authentication } from "../../../FirebaseConfig";
import { Vibration } from "react-native";

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/routes/types";
import GoBackButton from "../../navigation/GoBack";
import { UserContext, UserContextType } from "../../user/UserContext";
import * as Haptics from "expo-haptics";

const LoginScreen = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = Authentication;
  const { login, loading } = useContext(UserContext) as UserContextType;
  const triggerHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Ultra-short feedback
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <GoBackButton />
        <View style={{ justifyContent: "center", flex: 1 }}>
          <View style={styles.topflex}>
            <Text style={styles.welcome}>Welcome,</Text>
            <Text style={styles.glad}>Glad to see you!</Text>
          </View>
          <KeyboardAvoidingView behavior="padding">
            <TextInput
              style={styles.placeholder}
              placeholder="Email Address"
              value={email}
              placeholderTextColor={"grey"}
              onChangeText={(email) => {
                setEmail(email);
                triggerHapticFeedback(); // Vibrație scurtă
              }}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Password"
              secureTextEntry
              value={password}
              placeholderTextColor={"grey"}
              onChangeText={(password) => {
                setPassword(password);
                triggerHapticFeedback();
              }}
              autoCapitalize="none"
            />
            <Text style={styles.forgot}>Forgot password?</Text>
          </KeyboardAvoidingView>
          {loading ? (
            <View style={styles.activity}>
              <ActivityIndicator size="small" color="gray" />
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  login(email, password);
                  triggerHapticFeedback();
                }}
                activeOpacity={0}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.using}>Sign in using</Text>
          <View style={styles.socials}>
            <Facebook width={width * 0.22} height={height * 0.1} />
            <Google width={width * 0.22} height={height * 0.1} />
            <Apple width={width * 0.22} height={height * 0.1} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  socials: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    gap: 16,
  },
  forgot: {
    alignSelf: "flex-end",
    fontWeight: "500",
  },
  using: {
    alignSelf: "center",
    fontWeight: "500",
  },
  placeholder: {
    backgroundColor: "white",
    height: height * 0.07,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#0f4a68",
    padding: 8,
    fontSize: 16,
  },
  activity: {
    height: height * 0.07,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 48,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0f4a68",
    height: height * 0.07,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 48,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontFamily: "Courier",
    fontSize: 20,
    fontWeight: "bold",
  },
  welcome: {
    color: "#0f4a68",
    alignSelf: "center",
    fontFamily: "Courier",
    fontSize: 28,
    fontWeight: "bold",
  },
  glad: {
    color: "#0f4a68",
    alignSelf: "center",
    fontFamily: "Courier",
    fontSize: 28,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
  },
  buttontext: {
    color: "#0f4a68",
    fontWeight: "bold",
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#0f4a68",
  },
  logo: {
    width: width * 0.2,
    height: height * 0.1,
  },
  topflex: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
  },
  irclr: {
    fontSize: 32,
    color: "#0f4a68",
    fontWeight: "bold",
    fontFamily: "Courier",
  },
});

export default LoginScreen;
