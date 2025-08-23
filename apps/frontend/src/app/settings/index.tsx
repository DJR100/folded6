import React, { useState } from "react";
import { TouchableOpacity, Switch } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Text, View } from "@/components/ui";

const FEEDBACK_URL = "https://forms.gle/7nmUPk3wC15mmL4p8";

// helper chevron
const ChevronRight = () => <AntDesign name="right" size={16} color="white" style={{ opacity: 0.5 }} />;

export default function SettingsRoot() {
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center gap-2 px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="left" size={22} color="white" />
        </TouchableOpacity>
        <Text variant="h3" className="ml-2">Settings</Text>
      </View>

      <View className="px-4">
        <Text className="opacity-70 mb-2">FEEDBACK</Text>

        <TouchableOpacity className="bg-white/5 rounded-xl px-4 py-4 mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Feather name="star" size={16} color="white" />
              <Text className="text-white">Give Us a Review</Text>
            </View>
            <ChevronRight />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white/5 rounded-xl px-4 py-4 mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Feather name="message-square" size={16} color="white" />
              <Text className="text-white">Join the Community</Text>
            </View>
            <ChevronRight />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white/5 rounded-xl px-4 py-4 mb-3"
          onPress={() => WebBrowser.openBrowserAsync(FEEDBACK_URL)}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Feather name="thumbs-up" size={16} color="white" />
              <Text className="text-white">Provide Feedback</Text>
            </View>
            <ChevronRight />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white/5 rounded-xl px-4 py-4 mb-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Feather name="send" size={16} color="white" />
              <Text className="text-white">Support Email</Text>
            </View>
            <ChevronRight />
          </View>
        </TouchableOpacity>

        <Text className="opacity-70 mb-2">ACCOUNT</Text>

        {/* Notifications row stays as-is (no chevron) */}
        <View className="bg-white/5 rounded-xl px-4 py-4 mb-3 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Feather name="bell" size={16} color="white" />
            <Text className="text-white">Notifications</Text>
          </View>
          <Switch value={remindersEnabled} onValueChange={setRemindersEnabled} />
        </View>

        <TouchableOpacity
          className="bg-white/5 rounded-xl px-4 py-4"
          onPress={() => router.push("/settings/account")}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Feather name="user" size={16} color="white" />
              <Text className="text-white">Account Settings</Text>
            </View>
            <ChevronRight />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}