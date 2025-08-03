import { FontAwesome } from "@expo/vector-icons";
import { Redirect, Tabs, router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

import { colors } from "@/constants/colors";
import { useAuthContext } from "@/hooks/use-auth-context";
import { DailyChallengeProvider, useDailyChallengeContext } from "@/hooks/daily-challenge-context";
import { useNotifications } from "@/lib/notifications";

// Component that handles auto-launch logic - must be inside DailyChallengeProvider
function AutoLaunchHandler() {
  const context = useDailyChallengeContext();
  const { shouldAutoLaunch, resetForNewDay, isLoading } = context;
  const appState = useRef(AppState.currentState);
  const hasLaunchedToday = useRef(false);

  // Don't do anything if context is still loading
  if (isLoading) {
    return null;
  }

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      // Only trigger on app coming to foreground
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('🚀 App came to foreground');
        
        // Reset for new day if needed
        await resetForNewDay();
        
        // Check if we should auto-launch after potential reset
        if (shouldAutoLaunch && !hasLaunchedToday.current) {
          console.log('🎯 Auto-launching daily challenge');
          hasLaunchedToday.current = true;
          router.push("/(daily-challenge)/intro");
        }
      }
      appState.current = nextAppState;
    };

    // Check on initial mount (app start) - only if not loading
    if (shouldAutoLaunch && !hasLaunchedToday.current && !isLoading) {
      console.log('🎯 Auto-launching daily challenge on app start');
      hasLaunchedToday.current = true;
      router.push("/(daily-challenge)/intro");
    }

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [shouldAutoLaunch, resetForNewDay, isLoading]); // Add isLoading to dependencies

  // Reset the launch flag at midnight
  useEffect(() => {
    const resetAtMidnight = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const msUntilMidnight = tomorrow.getTime() - now.getTime();
      
      const timeout = setTimeout(() => {
        console.log('🕛 Midnight reached - resetting auto-launch flag');
        hasLaunchedToday.current = false;
        resetAtMidnight(); // Set up next midnight reset
      }, msUntilMidnight);
      
      return () => clearTimeout(timeout);
    };

    const cleanup = resetAtMidnight();
    return cleanup;
  }, []);

  return null; // This component doesn't render anything
}

export default function DashboardLayout() {
  const { user } = useAuthContext();
  useNotifications();

  if (!user) return <Redirect href="/" />;

  return (
    <DailyChallengeProvider>
      {/* TEMPORARILY COMMENT OUT AUTO-LAUNCH */}
      {/* <AutoLaunchHandler /> */}
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
