import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

import { FeedbackModal } from "@/components/feedbackModal";
import { DashboardLayout } from "@/components/layouts/dashboard";
import { ProfileEditModal } from "@/components/profile-edit-modal";
import { Text, View } from "@/components/ui";
import { useAuthContext } from "@/hooks/use-auth-context";

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useAuthContext();
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  return (
    <DashboardLayout>
      <View>
        {/* Top Row - Title & Settings */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="w-6" />

          {/* Centered Title */}
          <Text className="text-lg font-medium">Folded</Text>

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
            style={{ borderColor: "#9CA3AF", backgroundColor: "transparent" }}
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

        {/* Feedback Button */}
        <View className="w-full px-4 mt-8">
          <TouchableOpacity
            onPress={() => setFeedbackVisible(true)}
            className="w-full rounded-lg flex-row items-center justify-center"
            style={{
              height: 48,
              backgroundColor: "#16A34A", // darker green for better contrast
              opacity: 1.0,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text
              className="font-medium text-center"
              style={{
                color: "#FFFFFF",
                opacity: 1.0,
                fontSize: 16,
                fontWeight: "700",
                textShadowColor: "rgba(0, 0, 0, 0.55)",
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 3,
              }}
            >
              Send Feedback
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ProfileEditModal visible={isModalVisible} onClose={closeModal} />
      <FeedbackModal
        visible={feedbackVisible}
        onClose={() => setFeedbackVisible(false)}
      />
    </DashboardLayout>
  );
}
