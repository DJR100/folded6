import { router } from "expo-router";
import { useState } from "react";

import { OnboardingLayout } from "@/components/layouts/onboarding";
import { Button, Input, Text, View } from "@/components/ui";
import { useAuthContext } from "@/hooks/use-auth-context";

export default function RecoveryProgress() {
  const { setOnboarding, updateUser } = useAuthContext();
  const [recoveryDays, setRecoveryDays] = useState<string>("");
  const [showCelebration, setShowCelebration] = useState(false);

  const handleInputChange = (text: string) => {
    setRecoveryDays(text);
    const days = parseInt(text);
    if (days > 0 && !showCelebration) {
      setShowCelebration(true);
    } else if (days <= 0) {
      setShowCelebration(false);
    }
  };

  const onContinue = async () => {
    const days = parseInt(recoveryDays) || 0;
    
    if (days > 0) {
      // Calculate the start date based on existing progress
      const now = Date.now();
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const adjustedStartTime = now - (days * millisecondsPerDay);
      
      await updateUser("streak.start", adjustedStartTime);
      await updateUser("demographic.existingRecoveryDays", days);
    }
    
    // Skip step 3 (commented image selection) and go directly to step 4
    setOnboarding(4);
    router.push("/onboarding/4");
  };

  const onJustStarting = async () => {
    await updateUser("demographic.existingRecoveryDays", 0);
    // Skip step 3 (commented image selection) and go directly to step 4
    setOnboarding(4);
    router.push("/onboarding/4");
  };

  return (
    <OnboardingLayout
      title="Already making progress?"
      titleClassName="text-center"
      onBack={() => {
        setOnboarding(2);
        router.back();
      }}
    >
      <Text variant="p" className="text-center mb-6">
        If you've already started your recovery journey, let us know how many days you've been gambling-free. We want to celebrate every step of your progress!
      </Text>

      {showCelebration && (
        <View className="bg-accent/20 p-4 rounded-xl mb-4 border border-accent/30">
          <Text className="text-center font-bold text-accent">
            🎉 Amazing! {recoveryDays} day{parseInt(recoveryDays) !== 1 ? 's' : ''} of progress
          </Text>
          <Text className="text-center text-sm text-accent/80 mt-1">
            Your streak will be preserved in the app
          </Text>
        </View>
      )}

      <View className="flex flex-col gap-4 mb-6">
        <Input
          placeholder="Enter days (e.g., 7)"
          keyboardType="numeric"
          value={recoveryDays}
          onChangeText={handleInputChange}
        />
        
        <Text variant="sm" muted className="text-center">
          Don't worry if you're just starting - every journey begins with day 1
        </Text>
      </View>

      <View className="flex flex-col gap-3">
        <Button 
          text="Continue" 
          onPress={onContinue}
          disabled={recoveryDays === ""}
        />
        
        <Button 
          text="I'm just starting" 
          variant="secondary"
          onPress={onJustStarting}
        />
      </View>
    </OnboardingLayout>
  );
} 