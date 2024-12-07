import {
  Account,
  Home,
  HomeFill,
  Leaderboard,
  LeaderboardFill,
  Robot,
  RobotFill,
} from "@/assets/svgs";

import ChatScreen from "@/src/screens/chat/ChatScreen";
import LeaderboardScreen from "@/src/screens/leaderboard/LeaderBoardScreen";

import ProfileScreen from "@/src/screens/ProfileScreen";
import Screen3 from "@/src/screens/Screen3";
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
        component={Screen3}
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
          headerTitle: "AI Assistant",
          headerTitleStyle: {
            color: "#0f4a68",
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "Courier",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <RobotFill width={32} height={32} />
            ) : (
              <Robot width={32} height={32} />
            ),
        }}
      />
      <Tab.Screen
        name="postscreen"
        component={LeaderboardScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <LeaderboardFill width={32} height={32} />
            ) : (
              <Leaderboard width={32} height={32} />
            ),
        }}
      />
      <Tab.Screen
        name="profilescreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <Account width={32} height={32} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;
