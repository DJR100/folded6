import React from "react";
import { TouchableOpacity } from "react-native";

import { Text, View } from "@/components/ui";

interface CongratulationsProps {
  onClose: () => void;
}

export function Congratulations({ onClose }: CongratulationsProps) {
  return (
    <View className="flex-1 bg-black">
      {/* Main Content Card with Purple Background */}
      <View className="flex-1 px-4">
        <View 
          className="rounded-3xl p-8 justify-center items-center"
          style={{
            backgroundColor: '#8B5CF6', // Purple color
            shadowColor: '#8B5CF6',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 10,
            minHeight: 500,
            flex: 1,
          }}
        >
          {/* Congratulations Text */}
          <View className="items-center mb-12">
            <Text 
              className="text-white text-3xl font-bold text-center mb-8 leading-tight"
              style={{ lineHeight: 40 }}
            >
              Congratulations on{'\n'}completing today's{'\n'}recovery challenge!
            </Text>

            <Text 
              className="text-white text-xl font-medium text-center mb-6"
              style={{ opacity: 0.9 }}
            >
              Your streak has been updated.
            </Text>

            <Text 
              className="text-white text-xl font-medium text-center"
              style={{ opacity: 0.9 }}
            >
              See you tomorrow!
            </Text>
          </View>

          {/* Close Button - Same style as Get Started button */}
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

      {/* Bottom spacing for navigation bar */}
      <View className="h-20" />
    </View>
  );
} 