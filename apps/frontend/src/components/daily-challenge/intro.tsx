import React from "react";
import { TouchableOpacity } from "react-native";

import { DailyChallengeIntroProps } from "@folded/types";
import { Text, View, Button } from "@/components/ui";

export function DailyChallengeIntro({ 
  onGetStarted, 
  timeLeft, 
  streakCount 
}: DailyChallengeIntroProps) {
  return (
    <View className="flex-1 bg-black">
      {/* Top Header with Logo */}
      <View className="flex-row items-center justify-between px-4 pt-12 pb-4">
        <Text className="text-lg font-medium text-white">candle.</Text>
        <View className="flex-1" />
        {/* Flame icon - could be replaced with actual flame icon */}
        <Text className="text-2xl">🔥</Text>
      </View>

      {/* Progress Bar Placeholder */}
      <View className="mx-4 mb-8">
        <View 
          className="h-1 rounded-full"
          style={{ backgroundColor: '#4C4C4C' }}
        >
          {/* Progress fill - will be animated later */}
          <View 
            className="h-full rounded-full"
            style={{ 
              backgroundColor: '#00C399',
              width: '0%' // Will be dynamic based on completion
            }}
          />
        </View>
      </View>

      {/* Main Content Card */}
      <View className="flex-1 px-6">
        <View 
          className="rounded-3xl p-8 items-center justify-center"
          style={{
            backgroundColor: '#1a1a1a',
            // Subtle gradient effect using shadow/elevation
            shadowColor: '#00C399',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 20,
            elevation: 10,
            minHeight: 400,
          }}
        >
          {/* Daily Challenge Title */}
          <Text className="text-white text-lg font-medium mb-6">
            Daily Challenge
          </Text>

          {/* Main Challenge Text */}
          <Text 
            className="text-white text-2xl font-bold text-center mb-8 leading-tight"
            style={{ lineHeight: 32 }}
          >
            Answer the{'\n'}following question{'\n'}today.
          </Text>

          {/* Countdown Timer */}
          <Text 
            className="text-white text-4xl font-bold mb-2"
            style={{ fontFamily: 'monospace' }}
          >
            {timeLeft}
          </Text>
          
          <Text 
            className="text-white text-sm mb-12 opacity-60"
          >
            left to extend your {streakCount}-day streak!
          </Text>

          {/* Get Started Button */}
          <TouchableOpacity
            onPress={onGetStarted}
            className="w-full rounded-2xl py-4 px-8"
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 2,
              borderColor: 'transparent',
            }}
            // Add press state styling
            activeOpacity={0.8}
          >
            <Text 
              className="text-center font-semibold text-lg"
              style={{ color: '#000000' }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom spacing */}
      <View className="h-20" />
    </View>
  );
} 