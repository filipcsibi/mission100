// LoginScreen.tsx
import { Apple, Facebook, Google } from "@/assets/svgs";
import { Authentication, DataBase } from "../../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
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
} from "react-native";
import GoBackButton from "../../navigation/GoBack";
import { UserContext, UserContextType } from "../../user/UserContext";
const { width, height } = Dimensions.get("window");

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullName] = useState("");
  const { register, loading } = useContext(UserContext) as UserContextType;

  return (
    <View style={styles.container}>
      <GoBackButton />
      <View style={styles.topflex}>
        <Text style={styles.welcome}>Create Account</Text>
        <Text style={styles.glad}>to get started now!</Text>
      </View>
      <View>
        <TextInput
          style={styles.placeholder}
          placeholder="Full name"
          value={fullname}
          onChangeText={(fullname) => setFullName(fullname)}
        />
        <TextInput
          style={styles.placeholder}
          placeholder="Username"
          value={username}
          onChangeText={(username) => setUsername(username)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.placeholder}
          placeholder="Email Address"
          value={email}
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.placeholder}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
        />
      </View>

      {loading ? (
        <View style={styles.activity}>
          <ActivityIndicator size="small" color="gray" />
        </View>
      ) : (
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => register(fullname, username, email, password)}
            activeOpacity={0}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.using}>Sign up using</Text>
      <View style={styles.socials}>
        <Facebook width={width * 0.2} height={height * 0.1} />
        <Google width={width * 0.2} height={height * 0.1} />
        <Apple width={width * 0.2} height={height * 0.1} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  socials: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
    gap: 16,
  },
  activity: {
    height: height * 0.07,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 48,
    justifyContent: "center",
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
  },
  button: {
    backgroundColor: "#0f4a68",
    height: height * 0.07,
    borderRadius: 8,
    alignItems: "center",
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
    justifyContent: "center",
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
    marginTop: 24,
    marginBottom: 48,
  },
  irclr: {
    fontSize: 32,
    color: "#0f4a68",
    fontWeight: "bold",
    fontFamily: "Courier",
  },
});

export default RegisterScreen;
