import React, { useEffect, useMemo, useState } from "react";

import { Text, View } from "@/components/ui";
import { colors } from "@/constants/colors";

function split(value: number, min = 2) {
  return Math.max(0, value).toString().padStart(min, "0").split("");
}

function Digit({ d }: { d: string }) {
  return (
    <View
      className="mx-[2px] rounded-md items-center justify-center"
      style={{ width: 28, height: 38, backgroundColor: colors.accent }}
    >
      <Text className="text-xl font-[Satoshi-Bold]" style={{ color: "#ffffff" }}>
        {d}
      </Text>
    </View>
  );
}

function Segment({ digits, label }: { digits: string[]; label: string }) {
  return (
    <View className="items-center mx-1">
      <View className="flex-row">{digits.map((d, i) => <Digit key={i} d={d} />)}</View>
      <Text className="text-xs mt-1 opacity-70">{label}</Text>
    </View>
  );
}

export default function BetFreeTimer({
  startTimestampMs,
}: {
  startTimestampMs: number | null | undefined;
}) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const { days, hours, minutes, seconds } = useMemo(() => {
    if (!startTimestampMs) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const sec = Math.max(0, Math.floor((now - startTimestampMs) / 1000));
    return {
      days: Math.floor(sec / 86400),
      hours: Math.floor((sec % 86400) / 3600),
      minutes: Math.floor((sec % 3600) / 60),
      seconds: sec % 60,
    };
  }, [now, startTimestampMs]);

  return (
    <View>
      <View className="flex-row items-end justify-center">
        <Segment digits={split(days, 2)} label="Days" />
        <Text className="mx-1 text-2xl opacity-40">:</Text>
        <Segment digits={split(hours)} label="Hours" />
        <Text className="mx-1 text-2xl opacity-40">:</Text>
        <Segment digits={split(minutes)} label="Minutes" />
        <Text className="mx-1 text-2xl opacity-40">:</Text>
        <Segment digits={split(seconds)} label="Seconds" />
      </View>
    </View>
  );
}


