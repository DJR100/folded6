import React, { useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { ProfileEditModal } from "@/components/profile-edit-modal";
import { Text, View, Button } from "@/components/ui";
import { StreakTracker } from "@/components/daily-challenge/streak-tracker";
import { useDailyChallengeContext } from "@/hooks/daily-challenge-context";

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDevControls, setShowDevControls] = useState(__DEV__);
  
  // Connect to real daily challenge system
  const { 
    dailyChallenge, 
    weekProgress, 
    canStartChallenge,
    timeLeftInDay,
    completeChallenge,
    skipChallenge,
    resetDailyChallengeForDev,
    isLoading
  } = useDailyChallengeContext();

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  // Updated button logic with crystal clear text for completed state
  const getButtonConfig = () => {
    if (dailyChallenge.currentDayState === "completed") {
      return {
        text: `${timeLeftInDay.formatted} until next challenge`,
        disabled: true,
        opacity: 0.5, // Button background remains dimmed
        textColor: 'white',
        textOpacity: 1.0 // Text is completely visible - no opacity
      };
    } else if (dailyChallenge.currentDayState === "skipped") {
      return {
        text: "Try Daily Challenge Again",
        disabled: false,
        opacity: 0.8,
        textColor: 'white',
        textOpacity: 1.0
      };
    } else if (canStartChallenge) {
      return {
        text: "Start Daily Challenge",
        disabled: false,
        opacity: 0.8,
        textColor: 'white',
        textOpacity: 1.0
      };
    } else {
      return {
        text: "Challenge Not Available",
        disabled: true,
        opacity: 0.5,
        textColor: 'white',
        textOpacity: 1.0
      };
    }
  };

  const buttonConfig = getButtonConfig();

  // Dev helper functions
  const handleDevReset = async () => {
    if (resetDailyChallengeForDev) {
      await resetDailyChallengeForDev();
      Alert.alert("Dev Reset", "Daily challenge reset to pending state");
    }
  };

  const handleDevComplete = async () => {
    await completeChallenge();
    Alert.alert("Dev Complete", "Challenge marked as completed!");
  };

  const handleDevSkip = async () => {
    await skipChallenge();
    Alert.alert("Dev Skip", "Challenge marked as skipped!");
  };

  return (
    <DashboardLayout>
      <View>
        {/* Top Row - Title & Settings */}
        <View className="flex-row items-center justify-between mb-4">
          {/* Dev Toggle Button (left side) */}
          {__DEV__ && (
            <TouchableOpacity 
              onPress={() => setShowDevControls(!showDevControls)}
              style={{ padding: 4 }}
            >
              <Text className="text-xs" style={{ color: '#9CA3AF' }}>
                {showDevControls ? 'Hide' : 'Dev'}
              </Text>
            </TouchableOpacity>
          )}
          {!__DEV__ && <View className="w-6" />}
          
          {/* Centered Title */}
          <Text className="text-lg font-medium">Folded.</Text>
          
          {/* Settings Gear - Right aligned with margin */}
          <View style={{ marginRight: 6 }}>
            <AntDesign 
              name="setting" 
              size={24} 
              color="white"
              style={{ opacity: 0.4 }}
            />
          </View>
        </View>

        {/* DEV CONTROLS - Only visible in development */}
        {showDevControls && __DEV__ && (
          <View className="mb-6 mx-4 p-4 rounded-lg" style={{ backgroundColor: '#1F2937', borderWidth: 1, borderColor: '#374151' }}>
            <Text className="text-sm font-medium mb-3" style={{ color: '#F59E0B' }}>
              🛠️ Dev Controls
            </Text>
            
            {/* Current State Display */}
            <View className="mb-3">
              <Text className="text-xs" style={{ color: '#9CA3AF' }}>
                State: {dailyChallenge.currentDayState} | Streak: {dailyChallenge.streakCount} | Can Start: {canStartChallenge ? 'Yes' : 'No'}
              </Text>
            </View>

            {/* Dev Action Buttons */}
            <View className="flex-row flex-wrap gap-2">
              <TouchableOpacity
                onPress={handleDevReset}
                disabled={isLoading}
                className="flex-1 min-w-[100px] rounded px-3 py-2"
                style={{ backgroundColor: '#059669', opacity: isLoading ? 0.5 : 1 }}
              >
                <Text className="text-xs text-center text-white font-medium">
                  Reset to Pending
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleDevComplete}
                disabled={isLoading}
                className="flex-1 min-w-[100px] rounded px-3 py-2"
                style={{ backgroundColor: '#3B82F6', opacity: isLoading ? 0.5 : 1 }}
              >
                <Text className="text-xs text-center text-white font-medium">
                  Mark Completed
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleDevSkip}
                disabled={isLoading}
                className="flex-1 min-w-[100px] rounded px-3 py-2"
                style={{ backgroundColor: '#EF4444', opacity: isLoading ? 0.5 : 1 }}
              >
                <Text className="text-xs text-center text-white font-medium">
                  Mark Skipped
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Profile Picture & Username Block */}
        <View className="items-center mt-16">
          {/* Circular Profile Picture Placeholder */}
          <View 
            className="w-[120px] h-[120px] rounded-full border-2 border-gray-400 mb-4"
            style={{ 
              borderColor: '#9CA3AF', // medium grey
              backgroundColor: 'transparent' 
            }}
          />
          
          {/* Username with Edit Icon */}
          <View className="flex-row items-baseline">
            <Text className="text-lg font-semibold">Dillon</Text>
            <TouchableOpacity onPress={openModal} style={{ marginLeft: 4 }}>
              <AntDesign 
                name="edit" 
                size={16} 
                color="white"
                style={{ opacity: 0.4 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Challenge Button - Text fully visible, button remains opaque */}
        <View className="mt-6 px-4">
          <TouchableOpacity
            onPress={() => {
              if (!buttonConfig.disabled) {
                console.log("🔥 Starting daily challenge flow");
                router.push("/(daily-challenge)/intro");
              }
            }}
            disabled={buttonConfig.disabled || isLoading}
            className="w-full rounded-lg flex-row items-center justify-center"
            style={{ 
              height: 48,
              backgroundColor: dailyChallenge.currentDayState === "skipped" ? '#F59E0B' : '#3DF08B',
              opacity: (buttonConfig.disabled || isLoading) ? buttonConfig.opacity : buttonConfig.opacity,
            }}
          >
            <Text 
              className="font-medium" 
              style={{ 
                color: buttonConfig.textColor,
                opacity: buttonConfig.textOpacity // Full opacity for countdown text
              }}
            >
              {isLoading ? 'Loading...' : buttonConfig.text}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Real Streak Tracker - Connected to daily challenge data */}
        <StreakTracker
          streakCount={dailyChallenge.streakCount}
          weekProgress={weekProgress}
          className="mt-6 px-4"
        />
      </View>

      <ProfileEditModal
        visible={isModalVisible}
        onClose={closeModal}
      />
    </DashboardLayout>
  );
}
