import React, { useState } from "react";
import { TouchableOpacity, Switch } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

import { Text, View } from "@/components/ui";

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
          <Text>Give Us a Review</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white/5 rounded-xl px-4 py-4 mb-3">
          <Text>Join the Community</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white/5 rounded-xl px-4 py-4 mb-3">
          <Text>Provide Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white/5 rounded-xl px-4 py-4 mb-6">
          <Text>Support Email</Text>
        </TouchableOpacity>

        <Text className="opacity-70 mb-2">ACCOUNT</Text>

        <View className="bg-white/5 rounded-xl px-4 py-4 mb-3 flex-row items-center justify-between">
          <Text>Notifications</Text>
          <Switch value={remindersEnabled} onValueChange={setRemindersEnabled} />
        </View>

        <TouchableOpacity
          className="bg-white/5 rounded-xl px-4 py-4"
          onPress={() => router.push("/settings/account")}
        >
          <Text>Account settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


