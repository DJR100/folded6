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
          // Remove modal presentation to keep navigation bar visible
          animation: "slide_from_bottom",
        }}
      >
        <Stack.Screen 
          name="intro" 
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="photo-capture"
          options={{
            gestureEnabled: false,
          }}
        />
      </Stack>
    </DailyChallengeProvider>
  );
} 