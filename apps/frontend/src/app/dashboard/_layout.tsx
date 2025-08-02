import { FontAwesome } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

import { colors } from "@/constants/colors";
import { useAuthContext } from "@/hooks/use-auth-context";
import { DailyChallengeProvider } from "@/hooks/daily-challenge-context";
import { useNotifications } from "@/lib/notifications";

export default function DashboardLayout() {
  const { user } = useAuthContext();
  useNotifications();

  if (!user) return <Redirect href="/" />;

  return (
    <DailyChallengeProvider>
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: "black",
          // tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopWidth: 0,
            height: 40,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="home"
                size={24}
                color={focused ? colors.accent : colors.foreground}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="gear"
                size={24}
                color={focused ? colors.accent : colors.foreground}
              />
            ),
          }}
        />
      </Tabs>
    </DailyChallengeProvider>
  );
}
