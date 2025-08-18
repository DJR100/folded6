import React, { useMemo } from "react";
import { TouchableOpacity, Share, Alert } from "react-native";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";

import { Text, View } from "@/components/ui";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useDailyChallengeContext } from "@/hooks/daily-challenge-context";

interface CongratulationsProps {
  onClose: () => void;
}

export function Congratulations({ onClose }: CongratulationsProps) {
  const { user } = useAuthContext();
  const { dailyChallenge } = useDailyChallengeContext();

  const displayName = useMemo(
    () => user?.displayName || user?.email?.split("@")[0] || "User",
    [user]
  );

  const days = useMemo(() => {
    if (typeof dailyChallenge?.streakCount === "number") return dailyChallenge.streakCount;
    const start = user?.streak?.start ?? Date.now();
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.max(0, Math.floor((Date.now() - start) / msPerDay));
  }, [dailyChallenge?.streakCount, user?.streak?.start]);

  const isFirstDay = days === 1;

  const onShare = async () => {
    try {
      const message = isFirstDay
        ? `${displayName} just started the path to recovery — Day 1.`
        : `${displayName} has been bet free for ${days} days!`;
      await Share.share({ message });
    } catch (e) {
      console.error(e);
      Alert.alert("Share failed", "Something went wrong while sharing.");
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Main Content Card - Consistent with intro/photo capture */}
      <View className="flex-1 px-4">
        <View 
          className="rounded-3xl p-8 justify-center"
          style={{
            backgroundColor: '#8B5CF6',
            minHeight: 500,
            flex: 1,
          }}
        >
          {/* Congratulations Text - All centered */}
          <View className="mb-8 items-center">
            <Text 
              className="text-white text-2xl font-bold text-center leading-tight"
              style={{ lineHeight: 32 }}
            >
              Congratulations on{'\n'}completing today's{'\n'}recovery challenge!
            </Text>

            <Text 
              className="text-white text-lg font-medium text-center mt-6"
              style={{ opacity: 0.9 }}
            >
              Your streak has been updated.
            </Text>
          </View>

          {/* Visual Preview Card (no capture yet) */}
          <View className="items-center mb-6">
            <View
              className="rounded-3xl p-6 items-center w-full"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <View className="w-24 h-24 rounded-full border-2 overflow-hidden items-center justify-center" style={{ borderColor: '#8B5CF6' }}>
                {user?.photoURL ? (
                  <Image
                    source={{ uri: user.photoURL }}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                    transition={0}
                    cachePolicy="memory-disk"
                  />
                ) : (
                  <Text className="text-4xl">👤</Text>
                )}
              </View>

              <Text className="text-lg font-semibold mt-4" style={{ color: '#000000' }}>
                {displayName}
              </Text>

              <View className="mt-4 items-center">
                <Text className="text-5xl font-extrabold" style={{ color: '#000000' }}>
                  {days}
                </Text>
                <Text className="mt-1 text-center" style={{ color: 'rgba(0,0,0,0.7)' }}>
                  {isFirstDay ? "Day 1 - Taking the first step towards recovery!" : "days bet‑free"}
                </Text>
              </View>
            </View>
          </View>

          {/* Share Button */}
          <View className="items-center mb-3">
            <TouchableOpacity
              onPress={onShare}
              className="w-full rounded-2xl py-4 px-8"
              style={{
                backgroundColor: '#3DF08B',
                borderWidth: 2,
                borderColor: 'transparent',
              }}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center justify-center gap-2">
                <Text 
                  className="text-center font-semibold text-lg"
                  style={{ color: '#000000' }}
                >
                  Share on
                </Text>
                <FontAwesome name="whatsapp" size={20} color="#000000" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Close Button - Centered like intro button */}
          <View className="items-center">
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
                See you tomorrow!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bottom spacing for navigation bar */}
      <View className="h-18" />
    </View>
  );
}