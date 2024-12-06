// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXiPHvBLMniDRY-yLAHAjTfteSsBaE-_8",
  authDomain: "mission100-a67bd.firebaseapp.com",
  projectId: "mission100-a67bd",
  storageBucket: "mission100-a67bd.firebasestorage.app",
  messagingSenderId: "43248531574",
  appId: "1:43248531574:web:0fa6097f6ef08c09564757",
};

export const APP_FIREBASE = initializeApp(firebaseConfig);
export const Authentication = initializeAuth(APP_FIREBASE, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const DataBase = getFirestore(APP_FIREBASE);
export const Storage = getStorage(APP_FIREBASE);
