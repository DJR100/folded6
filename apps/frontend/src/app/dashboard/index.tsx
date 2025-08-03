import React, { useEffect, useState } from "react";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { PanicButton } from "@/components/panic-button";
import { Text, View } from "@/components/ui";
import { useAuthContext } from "@/hooks/use-auth-context";
import { cn } from "@/lib/cn";
import { MoneySavedTicker } from "@/components/money-saved-ticker";

export default function Index() {
  const { user } = useAuthContext();

  const [streak, setStreak] = useState<{
    major: {
      value: number;
      units: string;
    };
    minor: {
      value: number;
      units: string;
    };
  }>({ major: { value: 0, units: "s" }, minor: { value: 0, units: "ms" } });

  useEffect(() => {
    const streak = user?.streak.start ? Date.now() - user.streak.start : 0;
    const update = () => {
      const streak = user?.streak.start ? Date.now() - user.streak.start : 0;
      const milliseconds = Math.floor(Math.floor(streak % 1000) / 10);
      const seconds = Math.floor((streak / 1000) % 60);
      const minutes = Math.floor((streak / (1000 * 60)) % 60);
      const hours = Math.floor((streak / (1000 * 60 * 60)) % 24);
      const days = Math.floor(streak / (1000 * 60 * 60 * 24));

      if (days > 0) {
        setStreak({
          major: { value: days, units: "d" },
          minor: { value: hours, units: "h" },
        });
      } else if (hours > 0) {
        setStreak({
          major: { value: hours, units: "h" },
          minor: { value: minutes, units: "m" },
        });
      } else if (minutes > 0) {
        setStreak({
          major: { value: minutes, units: "m" },
          minor: { value: seconds, units: "s" },
        });
      } else if (seconds > 0) {
        setStreak({
          major: { value: seconds, units: "s" },
          minor: { value: milliseconds, units: "" },
        });
      } else {
        setStreak({
          major: { value: 0, units: "s" },
          minor: { value: milliseconds, units: "" },
        });
      }
    };

    update();

    const timeout = streak > 60 * 1000 ? 1000 : 33;
    const interval = setInterval(update, timeout);
    return () => clearInterval(interval);
  }, [user?.streak.start]);

  useEffect(() => {
    if (!user) return;
  }, [!!user]);

  const usdPerMs = user?.spendMeta?.usdPerMs;
  const quitTimestampMs = user?.streak?.start;

  return (
    <DashboardLayout>
      <View className="flex justify-between flex-1">
        <View className="flex flex-col gap-8 items-center py-8">
          {/* TODO: replace with animated blob, or picture of face or something more interesting */}
          <View className="w-1/2 aspect-square bg-accent rounded-full items-center ">
            <Text className="text-4xl mt-[40px]">👀</Text>
          </View>

          <View className="flex flex-col gap-2 items-center">
            <Text>Bet Free:</Text>
            {/* Streak duration */}
            <View className="flex flex-row gap-4 items-baseline">
              {/* Major */}
              <View className="flex flex-row gap-1 items-baseline">
                <Text variant="h1">{streak.major.value}</Text>
                <Text>{streak.major.units}</Text>
              </View>
              {/* Minor */}
              <View className="flex flex-row gap-1 items-baseline">
                <Text
                  variant="h1"
                  className={cn(!streak.minor.units && "min-w-[48px]")}
                >
                  {streak.minor.value}
                </Text>
                <Text>{streak.minor.units}</Text>
              </View>
            </View>
            {/* Money Saved Ticker */}
            {usdPerMs && quitTimestampMs && (
              <View className="mt-2 items-center">
                <Text>Money Saved:</Text>
                <MoneySavedTicker usdPerMs={usdPerMs} quitTimestampMs={quitTimestampMs} />
              </View>
            )}
          </View>
        </View>
        <PanicButton />
      </View>
    </DashboardLayout>
  );
}
