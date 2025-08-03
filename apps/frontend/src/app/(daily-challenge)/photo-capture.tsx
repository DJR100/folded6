import { router } from "expo-router";

import { PhotoCapture } from "@/components/daily-challenge/photo-capture";
import { ProgressBar } from "@/components/daily-challenge/progress-bar";
import { useDailyChallengeContext } from "@/hooks/daily-challenge-context";
import { PhotoResult } from "@folded/types";
import { View, Text } from "@/components/ui";

export default function PhotoCaptureScreen() {
  const { 
    completeChallenge, 
    skipChallenge,
    isLoading 
  } = useDailyChallengeContext();

  const handlePhotoTaken = async (photo: PhotoResult) => {
    try {
      await completeChallenge(photo);
      // Navigate back to dashboard - challenge completed
      router.dismissAll(); // Dismiss the entire modal stack
    } catch (error) {
      console.error("Error completing challenge:", error);
      // Could show error alert here
    }
  };

  const handleSkip = async () => {
    try {
      await skipChallenge();
      // Navigate back to dashboard - challenge skipped
      router.dismissAll(); // Dismiss the entire modal stack
    } catch (error) {
      console.error("Error skipping challenge:", error);
    }
  };

  return (
    <View className="flex-1">
      {/* Header with Folded text and fire emoji - matching intro page */}
      <View className="flex-row items-center justify-between px-4">
        <Text className="text-lg font-medium text-white ml-3">Folded</Text>
        <Text className="text-2xl mr-3">🔥</Text>
      </View>

      {/* Progress Bar - 50% since we're halfway through */}
      <ProgressBar progress={50} className="mx-4 mb-8" />
      
      {/* Main Photo Capture Component */}
      <PhotoCapture
        onPhotoTaken={handlePhotoTaken}
        onSkip={handleSkip}
        isLoading={isLoading}
      />
    </View>
  );
} 