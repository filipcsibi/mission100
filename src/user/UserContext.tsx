import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Authentication, DataBase } from "@/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User as FirebaseUser,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type UserContextType = {
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullname: string,
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoading(false);
      } catch (e) {
        console.log("Failed to load user:", e);
      }
    };
    loadUser();
  }, []);

  const saveUserToStorage = async (user: FirebaseUser | null) => {
    try {
      if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem("user");
      }
    } catch (e) {
      console.log("Failed to save user:", e);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        Authentication,
        email,
        password
      );
      if (!response.user.emailVerified) {
        alert("Please verify your email before logging in.");
        await Authentication.signOut();
        return;
      }
      setUser(response.user);
      saveUserToStorage(response.user);
    } catch (e) {
      console.log(e);
      alert("Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    fullname: string,
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    try {
      const usernameDoc = await getDoc(doc(DataBase, "users", username));
      if (usernameDoc.exists()) throw new Error("Username already taken.");

      const response = await createUserWithEmailAndPassword(
        Authentication,
        email,
        password
      );
      const uid = response.user.uid;

      await setDoc(doc(DataBase, "users", uid), {
        uid,
        username,
        email,
        createdAt: new Date(),
      });

      await updateProfile(response.user, {
        displayName: fullname,
      });

      await sendEmailVerification(response.user);

      alert(
        "Sign up successful. Please check your email for verification. Then log in!"
      );
      await Authentication.signOut();
    } catch (e) {
      console.log(e);
      alert("Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await Authentication.signOut();
      setUser(null);
      saveUserToStorage(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, login, register, logout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
