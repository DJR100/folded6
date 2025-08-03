import { router } from "expo-router";

import { DailyChallengeIntro } from "@/components/daily-challenge/intro";
import { ProgressBar } from "@/components/daily-challenge/progress-bar";
import { useDailyChallengeContext } from "@/hooks/daily-challenge-context";
import { View, Text } from "@/components/ui";

export default function DailyChallengeIntroScreen() {
  const { 
    dailyChallenge, 
    timeLeftInDay, 
    startChallenge,
    canStartChallenge,
    // @ts-ignore - Dev mode function might not exist in production
    resetDailyChallengeForDev
  } = useDailyChallengeContext();

  const handleGetStarted = () => {
    if (!canStartChallenge) return;
    
    startChallenge(); // Analytics event
    router.push("/(daily-challenge)/photo-capture");
  };

  // DEV MODE: Allow access even if completed - in dev mode, show the flow regardless
  const isDev = __DEV__;
  const shouldShowFlow = isDev || dailyChallenge.currentDayState === "pending";

  // If user already completed today and not in dev mode, redirect back
  if (!shouldShowFlow) {
    router.back();
    return null;
  }

  return (
    <View className="flex-1">
      {/* Top Header with Logo positioned above progress bar */}
      <View className="flex-row items-center justify-between px-4 pt-12 pb-4">
        <Text className="text-lg font-medium text-white">candle.</Text>
        <View className="flex-1" />
        <Text className="text-2xl">🔥</Text>
      </View>
      
      {/* Single Progress Bar */}
      <ProgressBar progress={0} className="mx-4 mb-8" />

      {/* DEV MODE: Show reset button if available */}
      {isDev && resetDailyChallengeForDev && (
        <View className="mx-4 mb-4">
          <Text 
            className="text-xs text-gray-400 text-center mb-2"
          >
            DEV MODE - Current state: {dailyChallenge.currentDayState}
          </Text>
          <Text 
            className="text-xs text-blue-400 text-center underline"
            onPress={resetDailyChallengeForDev}
          >
            Reset to Pending State
          </Text>
        </View>
      )}
      
      {/* Main Intro Component */}
      <DailyChallengeIntro
        onGetStarted={handleGetStarted}
        timeLeft={timeLeftInDay.formatted}
        streakCount={dailyChallenge.streakCount}
      />
    </View>
  );
} 