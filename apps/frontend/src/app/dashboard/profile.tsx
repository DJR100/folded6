import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { ProfileEditModal } from "@/components/profile-edit-modal";
import { Text, View } from "@/components/ui";

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <DashboardLayout>
      <View>
        {/* Top Row - Title & Settings */}
        <View className="flex-row items-center justify-between mb-4">
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
              borderColor: '#9CA3AF',
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

        {/* You could add other profile-specific content here */}
      </View>

      <ProfileEditModal
        visible={isModalVisible}
        onClose={closeModal}
      />
    </DashboardLayout>
  );
}
