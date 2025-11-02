import { Redirect, router } from "expo-router";
import { useWindowDimensions } from "react-native";

import { Button, Text, View } from "@/components/ui";
import Face from "@/components/ui/face";
import Hover from "@/components/ui/hover";
import { useAuthContext } from "@/hooks/use-auth-context";

export default function SignIn() {
  const { user } = useAuthContext();
  const { width } = useWindowDimensions();

  if (user?.tier) return <Redirect href="/dashboard" />;
  // Do not auto-redirect to onboarding. Let users tap to continue.

  // Scale factor based on a reference width (iPhone 14 Pro: 393px)
  const referenceWidth = 393;
  const scale = width / referenceWidth;

  // Original positions scaled proportionally
  const positions = [
    { top: -20 * scale, left: -100 * scale },
    { top: 10 * scale, left: 60 * scale },
    { top: -10 * scale, left: 220 * scale },
    { top: 200 * scale, left: 0 * scale },
    { top: 180 * scale, left: 160 * scale },
    { top: 160 * scale, left: 320 * scale },
  ];

  return (
    <View className="flex-1 flex gap-2">
      <View className="w-full">
        <Text className="text-center text-3xl font-bold my-8 mb-4">FOLDED</Text>
      </View>
      <View className="flex-1 w-full items-center justify-center">
        <Hover top={positions[0].top} left={positions[0].left}>
          <Face
            name="James"
            streak={7}
            src={require("@/assets/images/faces/face-0.jpg")}
            scale={scale}
          />
        </Hover>
        <Hover top={positions[1].top} left={positions[1].left}>
          <Face
            name="Jerome"
            streak={16}
            src={require("@/assets/images/faces/face-1.jpg")}
            scale={scale}
          />
        </Hover>
        <Hover top={positions[2].top} left={positions[2].left}>
          <Face
            name="Jed"
            streak={86}
            src={require("@/assets/images/faces/face-2.jpg")}
            scale={scale}
          />
        </Hover>
        <Hover top={positions[3].top} left={positions[3].left}>
          <Face
            name="Jeff"
            streak={32}
            src={require("@/assets/images/faces/face-3.jpg")}
            scale={scale}
          />
        </Hover>
        <Hover top={positions[4].top} left={positions[4].left}>
          <Face
            name="James"
            streak={32}
            src={require("@/assets/images/faces/face-4.jpg")}
            scale={scale}
          />
        </Hover>
        <Hover top={positions[5].top} left={positions[5].left}>
          <Face
            name="Jake"
            streak={32}
            src={require("@/assets/images/faces/face-4.jpg")}
            scale={scale}
          />
        </Hover>
      </View>

      <View className="w-full flex items-center gap-8 pt-6 px-4">
        {/* Title */}
        <View className="w-full flex items-center gap-2">
          <Text variant="h1" className="text-center">
            Are you ready to{"\n"}
            <Text variant="h1" className="text-accent">
              quit forever?
            </Text>
          </Text>
          <Text variant="p" className="text-center px-2" muted>
            Join the community for people committed to quitting gambling.
          </Text>
        </View>

        {/* Buttons */}
        <View className="w-full flex items-center gap-3 mb-6">
          <Button
            variant="accent"
            text={user ? "Continue onboarding" : "Sign in / Create account"}
            onPress={() =>
              user ? router.push("/onboarding") : router.push("/auth/sign-in")
            }
          />
        </View>
      </View>
    </View>
  );
}
