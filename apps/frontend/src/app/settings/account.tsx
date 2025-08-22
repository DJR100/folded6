import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { Text, View } from "@/components/ui";

export default function AccountSettings() {
  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center gap-2 px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="left" size={22} color="white" />
        </TouchableOpacity>
        <Text variant="h3" className="ml-2">Account</Text>
      </View>

      <View className="px-4">
        <Text className="opacity-70">Coming soon</Text>
      </View>
    </View>
  );
}


