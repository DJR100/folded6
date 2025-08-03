import { Stack, useSegments } from "expo-router";
import { useMemo } from "react";

import { colors } from "@/constants/colors";
import { DailyChallengeProvider } from "@/hooks/daily-challenge-context";
import { ProgressBar } from "@/components/daily-challenge/progress-bar";
import { View, Text } from "@/components/ui";

export default function DailyChallengeLayout() {
  const segments = useSegments();
  const currentRoute = segments[segments.length - 1];

  // Determine progress based on current route
  const progress = useMemo(() => {
    switch (currentRoute) {
      case 'intro':
        return 0;
      case 'photo-capture':
        return 50;
      case 'congratulations':
        return 100;
      default:
        return 0;
    }
  }, [currentRoute]);

  return (
    <DailyChallengeProvider>
      <View className="flex-1">
        {/* Persistent Header - Folded text and fire emoji */}
        <View className="flex-row items-center justify-between px-4">
          <Text className="text-lg font-medium text-white ml-3">Folded</Text>
          <Text className="text-2xl mr-3">🔥</Text>
        </View>

        {/* Persistent Progress Bar */}
        <ProgressBar progress={progress} className="mx-4 mb-8" />

        {/* Stack Navigation for Content */}
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colors.background,
            },
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
          <Stack.Screen 
            name="congratulations"
            options={{
              gestureEnabled: false,
            }}
          />
        </Stack>
      </View>
    </DailyChallengeProvider>
  );
} 