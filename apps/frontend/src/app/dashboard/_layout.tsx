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
          name="profile"
          options={{
            title: "Profile", 
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="user"
                size={24}
                color={focused ? colors.accent : colors.foreground}
              />
            ),
          }}
        />
        {/** Settings moved to modal in dashboard/index; bottom-tab entry removed */}
      </Tabs>
    </DailyChallengeProvider>
  );
}
