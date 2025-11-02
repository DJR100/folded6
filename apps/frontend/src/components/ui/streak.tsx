import { Text, View } from "@/components/ui";

export const Streak = ({ streak, scale = 1 }: { streak: number; scale?: number }) => (
  <View className="flex flex-row gap-1 items-center justify-center mt-[-4px]">
    <Text className="text-sm mt-[-3px]" style={{ fontSize: 14 * scale }}>
      🔥
    </Text>
    <Text className="text-center mt-[-2px]" muted style={{ fontSize: 12 * scale }}>
      {streak} day streak
    </Text>
  </View>
);
