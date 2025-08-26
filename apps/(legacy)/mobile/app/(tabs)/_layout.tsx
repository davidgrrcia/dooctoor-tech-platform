import { Tabs } from "expo-router";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Calendar, Home, User } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FD8006",
        tabBarInactiveTintColor: "#9CA3AF",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <Home size={24} color={color as string} />,
        }}
      />

      <Tabs.Screen
        name="appointments"
        options={{
          title: "Agenda",
          tabBarIcon: ({ color }) => (
            <Calendar size={24} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <User size={24} color={color as string} />,
        }}
      />
    </Tabs>
  );
}
