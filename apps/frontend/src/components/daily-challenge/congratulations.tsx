import React from "react";
import { TouchableOpacity } from "react-native";

import { Text, View } from "@/components/ui";

interface CongratulationsProps {
  onClose: () => void;
}

export function Congratulations({ onClose }: CongratulationsProps) {
  return (
    <View className="flex-1 bg-background">
      {/* Main Content Card - Consistent with intro/photo capture */}
      <View className="flex-1 px-4">
        <View 
          className="rounded-3xl p-8 justify-center"
          style={{
            backgroundColor: '#8B5CF6', // Purple color
            minHeight: 500,
            flex: 1, // Match other pages
          }}
        >
          {/* Congratulations Text - All centered */}
          <View className="mb-12 items-center">
            <Text 
              className="text-white text-2xl font-bold text-center leading-tight"
              style={{ lineHeight: 32 }}
            >
              Congratulations on{'\n'}completing today's{'\n'}recovery challenge!
            </Text>

            <Text 
              className="text-white text-lg font-medium text-center mt-6"
              style={{ opacity: 0.9 }}
            >
              Your streak has been updated.
            </Text>

            <Text 
              className="text-white text-lg font-medium text-center mt-2"
              style={{ opacity: 0.9 }}
            >
              See you tomorrow!
            </Text>
          </View>

          {/* Close Button - Centered like intro button */}
          <View className="items-center">
            <TouchableOpacity
              onPress={onClose}
              className="w-full rounded-2xl py-4 px-8"
              style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 2,
                borderColor: 'transparent',
              }}
              activeOpacity={0.8}
            >
              <Text 
                className="text-center font-semibold text-lg"
                style={{ color: '#000000' }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bottom spacing for navigation bar */}
      <View className="h-20" />
    </View>
  );
} 