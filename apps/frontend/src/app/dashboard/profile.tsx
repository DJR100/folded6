import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { ProfileEditModal } from "@/components/profile-edit-modal";
import { Text, View, Button } from "@/components/ui";

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);

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

        {/* Primary Action Button */}
        <View className="mt-6 px-4">
          <View 
            className="w-full rounded-lg flex-row items-center justify-center"
            style={{ 
              height: 48, // 48px on phones, could be responsive
              backgroundColor: '#3DF08B', // Folded's signature green
              opacity: 0.8,
              pointerEvents: 'none'
            }}
          >
            <Text 
              className="font-medium" 
              style={{ color: 'white' }}
            >
              Start Daily Challenge
            </Text>
          </View>
        </View>

        {/* Daily Streak Widget */}
        <View className="mt-6 px-4">
          {/* Header Strip */}
          <View className="flex-row items-center justify-between">
            {/* Left side - Fire emoji and streak text */}
            <View className="flex-row items-center">
              <Text className="text-lg">🔥</Text>
              <Text className="ml-2 text-base font-medium">5-day streak!</Text>
            </View>
            
            {/* Right side - Info icon aligned with Sunday label center */}
            <View style={{ marginRight: 4 }}>
              <AntDesign 
                name="infocirlceo" 
                size={16} 
                color="white"
                style={{ opacity: 0.6 }}
              />
            </View>
          </View>

          {/* Day-by-Day Tracker Row */}
          <View className="mt-4">
            <View className="relative">
              {/* Day Labels Row */}
              <View className="flex-row justify-between mb-2">
                <Text className="text-xs text-center w-6" style={{ color: '#9CA3AF' }}>M</Text>
                <Text className="text-xs text-center w-6" style={{ color: '#9CA3AF' }}>TU</Text>
                <Text className="text-xs text-center w-6" style={{ color: '#9CA3AF' }}>W</Text>
                <Text className="text-xs text-center w-6" style={{ color: '#9CA3AF' }}>TH</Text>
                <Text className="text-xs text-center w-6" style={{ color: '#F97316' }}>F</Text>
                <Text className="text-xs text-center w-6" style={{ color: '#9CA3AF' }}>SA</Text>
                <Text className="text-xs text-center w-6" style={{ color: '#9CA3AF' }}>SU</Text>
              </View>

              {/* Circles Row with Progress Rail */}
              <View className="relative">
                {/* Progress Rail - symmetric line extending equally on both sides */}
                <View 
                  className="absolute"
                  style={{ 
                    height: 1, 
                    backgroundColor: '#9CA3AF',
                    top: 11, // Center of 24px circles (12px from top)
                    left: -12, // Extend left by half circle width
                    right: -12, // Extend right by half circle width
                  }}
                />

                {/* Seven Day Circles - perfectly aligned under labels */}
                <View className="flex-row justify-between">
                  {/* Monday */}
                  <View 
                    className="w-6 h-6 rounded-full items-center justify-center"
                    style={{ backgroundColor: '#3DF08B' }}
                  >
                    <AntDesign name="check" size={12} color="white" />
                  </View>

                  {/* Tuesday */}
                  <View 
                    className="w-6 h-6 rounded-full items-center justify-center"
                    style={{ backgroundColor: '#3DF08B' }}
                  >
                    <AntDesign name="check" size={12} color="white" />
                  </View>

                  {/* Wednesday */}
                  <View 
                    className="w-6 h-6 rounded-full items-center justify-center"
                    style={{ backgroundColor: '#3DF08B' }}
                  >
                    <AntDesign name="check" size={12} color="white" />
                  </View>

                  {/* Thursday */}
                  <View 
                    className="w-6 h-6 rounded-full items-center justify-center"
                    style={{ backgroundColor: '#3DF08B' }}
                  >
                    <AntDesign name="check" size={12} color="white" />
                  </View>

                  {/* Friday - Current Day */}
                  <View 
                    className="w-6 h-6 rounded-full items-center justify-center"
                    style={{ backgroundColor: '#3DF08B' }}
                  >
                    <AntDesign name="check" size={12} color="white" />
                  </View>

                  {/* Saturday */}
                  <View 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: '#4B5563' }}
                  />

                  {/* Sunday */}
                  <View 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: '#4B5563' }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Use the existing ProfileEditModal component */}
      <ProfileEditModal
        visible={isModalVisible}
        onClose={closeModal}
      />
    </DashboardLayout>
  );
}
