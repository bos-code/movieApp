import { APP_TINT, TAB_BAR_COLOR, WHITE } from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";

import { Tabs } from "expo-router";

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: APP_TINT,
        tabBarInactiveTintColor: WHITE,
        tabBarStyle: {
          backgroundColor: TAB_BAR_COLOR,
          height: 90,
          paddingTop: 10,
          borderTopColor: "transparent",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <Octicons
              name={focused ? "home-fill" : "home"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <AntDesign name="search" size={24} color={color} />
            ) : (
              <Octicons name="search" size={24} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <Octicons
              name={focused ? "bookmark-filled" : "bookmark"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
