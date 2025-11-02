import { Image } from "expo-image";

import { Text, View } from "@/components/ui";
import { Streak } from "@/components/ui/streak";

const Face = ({
  name,
  streak,
  src,
  scale = 1,
}: {
  name: string;
  streak: number;
  src: string;
  scale?: number;
}) => {
  const size = 120 * scale;
  const borderRadius = 70 * scale;

  return (
    <View className="flex flex-col items-center gap-1">
      <Image
        source={src}
        style={{ width: size, height: size, borderRadius: borderRadius }}
      />
      <View className="flex flex-col">
        <Text className="text-center font-bold" style={{ fontSize: 14 * scale }}>
          {name}
        </Text>

        <Streak streak={streak} scale={scale} />
      </View>
    </View>
  );
};

export default Face;
