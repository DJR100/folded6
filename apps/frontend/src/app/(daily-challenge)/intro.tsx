import { router } from "expo-router";

import { DailyChallengeIntro } from "@/components/daily-challenge/intro";
import { ProgressBar } from "@/components/daily-challenge/progress-bar";
import { useDailyChallengeContext } from "@/hooks/daily-challenge-context";
import { View } from "@/components/ui";

export default function DailyChallengeIntroScreen() {
  const { 
    dailyChallenge, 
    timeLeftInDay, 
    startChallenge,
    canStartChallenge 
  } = useDailyChallengeContext();

  const handleGetStarted = () => {
    if (!canStartChallenge) return;
    
    startChallenge(); // Analytics event
    router.push("/(daily-challenge)/photo-capture");
  };

  // If user already completed today, redirect back
  if (dailyChallenge.currentDayState !== "pending") {
    router.back();
    return null;
  }

  return (
    <View className="flex-1">
      {/* Progress Bar */}
      <ProgressBar progress={0} className="mx-4 mt-4 mb-8" />
      
      {/* Main Intro Component */}
      <DailyChallengeIntro
        onGetStarted={handleGetStarted}
        timeLeft={timeLeftInDay.formatted}
        streakCount={dailyChallenge.streakCount}
      />
    </View>
  );
} 