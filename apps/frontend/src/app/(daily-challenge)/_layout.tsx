import { Stack } from "expo-router";

import { colors } from "@/constants/colors";

export default function DailyChallengeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
        presentation: "modal", // This makes it appear as a modal overlay
        animation: "slide_from_bottom",
      }}
    >
      <Stack.Screen 
        name="intro" 
        options={{
          gestureEnabled: false, // Prevent swipe to dismiss - user must complete or skip
        }}
      />
      <Stack.Screen 
        name="photo-capture"
        options={{
          gestureEnabled: false, // Prevent swipe to dismiss
        }}
      />
    </Stack>
  );
} 