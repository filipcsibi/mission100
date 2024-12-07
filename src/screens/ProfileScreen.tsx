import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { UserContext, UserContextType } from "../user/UserContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { DataBase, Storage } from "@/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import * as Progress from "react-native-progress";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
const { width } = Dimensions.get("window");
const ProfileScreen = () => {
  const { user, logout } = useContext(UserContext) as UserContextType;
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>("");
  const blankProfilePicture = require("../../assets/images/BlankProfile.jpg");
  useEffect(() => {
    if (!user) {
      console.log("useeffecterror");
      return;
    }
    const getProfilePic = async () => {
      try {
        const userDocRef = doc(DataBase, "users", user.uid);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists())
          setProfilePicture(userSnapshot.data().profilePicture);
      } catch (error) {
        console.log(error);
      }
    };
    getProfilePic();
  }, []);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access the media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      handleProfilePicture(result.assets[0].uri);
    }
  };

  const handleProfilePicture = async (uri: string) => {
    if (!uri) {
      console.error("No image selected");
      return;
    }
    if (!user) {
      console.log("no user");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      const userDocRef = doc(DataBase, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();

        if (userData?.profilePicture) {
          const previousImageRef = storageRef(Storage, userData.profilePicture);
          await deleteObject(previousImageRef);
          console.log("previous deleted");
        } else {
          console.log("error");
        }
      }
      const fileRef = storageRef(
        Storage,
        "profilePictures/" + new Date().getTime()
      );
      const response = await fetch(uri);
      const blob = await response.blob();

      const uploadTask = uploadBytesResumable(fileRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (error) => {
          setUploading(false);
          console.error("Upload error:", error);
        },
        async () => {
          console.log("Upload complete");
          const downloadURL = await getDownloadURL(fileRef);
          setProfilePicture(downloadURL);
          console.log("File available at:", downloadURL);

          const userDocRef = doc(DataBase, "users", user.uid);
          await updateDoc(userDocRef, {
            profilePicture: downloadURL,
          });

          setUploading(false);
          setUploadProgress(0);
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      {/* Background image */}
      <TouchableOpacity style={styles.bg}>
        <Image
          source={require("../../assets/images/mission100logo.jpeg")} // Replace with your image URI
          style={styles.bgImage}
        />
      </TouchableOpacity>

      {/* Profile info */}
      <View style={styles.imgProfile}>
        <Image
          source={
            profilePicture
              ? {
                  uri: profilePicture,
                }
              : blankProfilePicture
          }
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user?.displayName}</Text>
        <Text style={styles.id}>ID {user?.uid}</Text>
      </View>

      {/* Items */}
      <View style={{ flex: 1, padding: 12 }}>
        <TouchableOpacity style={styles.item} onPress={pickImage}>
          {!uploading ? (
            <Text style={styles.itemText}>Change Profile Photo</Text>
          ) : (
            <Progress.Bar
              progress={uploadProgress / 100}
              color="#0f4a68"
              style={{ alignSelf: "center" }}
            />
          )}
        </TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.itemText}>Address</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Notification</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Settings</Text>
        </View>
      </View>
      {/* Logout */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.itemLogout} onPress={() => logout()}>
          <Text style={styles.itemText2}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFCFF",
  },
  bg: {
    shadowColor: "#1eb4e8",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 20,
  },
  bgImage: {
    width: width,
    height: width * 0.6,
    resizeMode: "cover",
  },
  imgProfile: {
    alignItems: "center",
    marginTop: -width * 0.2,
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: 100,
  },
  name: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
  },
  id: {
    fontSize: 14,
    color: "#828282",
    marginTop: 5,
  },
  item: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f4a68",
  },
  itemText2: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  itemLogout: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#0f4a68",
    marginVertical: 20,
    borderRadius: 12,
  },
  logoutContainer: {
    shadowColor: "#000", // Culoarea umbrei
    shadowOffset: { width: 0, height: 4 }, // Poziția umbrei (orizontală și verticală)
    shadowOpacity: 0.1, // Opacitatea umbrei
    shadowRadius: 6, // Raza umbrei
    elevation: 5, // Efectul de umbră pe Android
    padding: 12,
  },
});

export default ProfileScreen;
