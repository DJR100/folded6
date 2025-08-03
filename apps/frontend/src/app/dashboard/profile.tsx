import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { ProfileEditModal } from "@/components/profile-edit-modal";
import { Text, View, Button } from "@/components/ui";
import { StreakTracker } from "@/components/daily-challenge/streak-tracker";
// REMOVE this line temporarily: import { useDailyChallengeContext } from "@/hooks/daily-challenge-context";

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // For development - use mock data or bypass context entirely
  const mockWeekProgress = [
    { day: "M" as const, completed: true, isToday: false },
    { day: "TU" as const, completed: true, isToday: false },
    { day: "W" as const, completed: true, isToday: false },
    { day: "TH" as const, completed: true, isToday: false },
    { day: "F" as const, completed: true, isToday: true },
    { day: "SA" as const, completed: false, isToday: false },
    { day: "SU" as const, completed: false, isToday: false },
  ];

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <DashboardLayout>
      <View>
        {/* Top Row - Title & Settings */}
        <View className="flex-row items-center justify-between mb-4">
          {/* Empty space for left alignment */}
          <View className="w-6" />
          
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

        {/* Primary Action Button - ALWAYS ENABLED for development */}
        <View className="mt-6 px-4">
          <TouchableOpacity
            onPress={() => {
              console.log("🔥 Starting daily challenge flow");
              router.push("/(daily-challenge)/intro");
            }}
            className="w-full rounded-lg flex-row items-center justify-center"
            style={{ 
              height: 48,
              backgroundColor: '#3DF08B',
              opacity: 0.8,
            }}
          >
            <Text className="font-medium" style={{ color: 'white' }}>
              Start Daily Challenge (Dev)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Streak Tracker with mock data */}
        <StreakTracker
          streakCount={5}
          weekProgress={mockWeekProgress}
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
