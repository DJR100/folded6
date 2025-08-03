import { Stack } from "expo-router";

import { colors } from "@/constants/colors";
import { DailyChallengeProvider } from "@/hooks/daily-challenge-context";

export default function DailyChallengeLayout() {
  return (
    <DailyChallengeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
          // No presentation property = use regular stack navigation
        }}
      >
        <Stack.Screen 
          name="intro" 
          options={{
            gestureEnabled: true,
          }}
        />
        <Stack.Screen 
          name="photo-capture"
          options={{
            gestureEnabled: true,
          }}
        />
      </Stack>
    </DailyChallengeProvider>
  );
} 