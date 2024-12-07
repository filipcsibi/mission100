import { View, Text, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./style";
import { UserContext, UserContextType } from "@/src/user/UserContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { DataBase } from "@/FirebaseConfig";

const Header = () => {
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>(null);
  const blankProfilePicture = require("../../../../../assets/images/ProfileBlank.png");

  const { user } = useContext(UserContext) as UserContextType;
  useEffect(() => {
    const fetchUserPhoto = async () => {
      try {
        const userRef = collection(DataBase, "users");

        const q = query(userRef, where("uid", "==", user?.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0].data();
          setUserPhotoURL(userDoc?.profilePicture);
        } else {
          console.error("No such document!");
          setUserPhotoURL(null);
        }
      } catch (error) {
        console.error("Error fetching user photo URL: ", error);
        setUserPhotoURL(null);
      }
    };

    fetchUserPhoto();
  }, [user?.uid]);
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Hi, {user?.displayName}</Text>
        <Text style={styles.description}>Let's make this day productive</Text>
      </View>
      <Image
        source={
          userPhotoURL
            ? {
                uri: userPhotoURL,
              }
            : blankProfilePicture
        }
        style={styles.avatar}
      />
    </View>
  );
};

export default Header;
