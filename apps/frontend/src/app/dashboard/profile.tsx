import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import { useAuthContext } from "@/hooks/use-auth-context";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { ProfileEditModal } from "@/components/profile-edit-modal";
import { Text, View } from "@/components/ui";

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useAuthContext();

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "User";

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
          {/* Circular Profile Picture */}
          <View
            className="w-[120px] h-[120px] rounded-full border-2 border-gray-400 mb-4 items-center justify-center overflow-hidden"
            style={{ borderColor: '#9CA3AF', backgroundColor: 'transparent' }}
          >
            {user?.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                style={{ width: 120, height: 120, borderRadius: 60 }}
                contentFit="cover"
              />
            ) : (
              <Text className="text-4xl">👤</Text>
            )}
          </View>
          
          {/* Username with Edit Icon */}
          <View className="flex-row items-baseline">
            <Text className="text-lg font-semibold">{displayName}</Text>
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
