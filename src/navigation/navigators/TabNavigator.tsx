import {
  Account,
  Home,
  HomeFill,
  Post,
  PostFill,
  Search,
  SearchFill,
} from "@/assets/svgs";
import ChatScreen from "@/src/screens/chat/ChatScreen";
import Screen1 from "@/src/screens/Screen1";
import Screen2 from "@/src/screens/Screen2";
import Screen3 from "@/src/screens/Screen3";
import Screen4 from "@/src/screens/Screen4";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  useEffect(() => {
    console.log("TabNavigator mounted");
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: "Mission100",
        headerTitleStyle: {
          color: "#0f4a68",
          fontSize: 24,
          fontWeight: "bold",
          fontFamily: "Courier",
        },
        headerTitleAlign: "left",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="feedscreen"
        component={Screen1}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeFill width={32} height={32} />
            ) : (
              <Home width={32} height={32} />
            ),
        }}
      />
      <Tab.Screen
        name="searchscreen"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SearchFill width={32} height={32} />
            ) : (
              <Search width={32} height={32} />
            ),
        }}
      />
      <Tab.Screen
        name="postscreen"
        component={Screen3}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <PostFill width={32} height={32} />
            ) : (
              <Post width={32} height={32} />
            ),
        }}
      />
      <Tab.Screen
        name="profilescreen"
        component={Screen4}
        options={{
          tabBarIcon: () => <Account width={32} height={32} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;
