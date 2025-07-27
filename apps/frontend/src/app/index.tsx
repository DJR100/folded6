import { Redirect } from "expo-router";

import { Button, Text, View } from "@/components/ui";
import Face from "@/components/ui/face";
import Hover from "@/components/ui/hover";
import { useAuthContext } from "@/hooks/use-auth-context";

export default function SignIn() {
  const { signUp, user } = useAuthContext();

  if (user?.tier) return <Redirect href="/dashboard" />;
  if (user) return <Redirect href="/onboarding" />;

  return (
    <View className="flex-1 flex gap-2">
      <View className="w-full">
        <Text className="text-center text-3xl font-bold my-8 mb-4">FOLDED</Text>
      </View>

      <View className="flex-1 w-full items-center justify-center">
        <Hover top={-20} left={-100}>
          <Face
            name="James"
            streak={7}
            src={require("@/assets/images/faces/face-0.jpg")}
          />
        </Hover>
        <Hover top={10} left={60}>
          <Face
            name="Jerome"
            streak={16}
            src={require("@/assets/images/faces/face-1.jpg")}
          />
        </Hover>
        <Hover top={-10} left={220}>
          <Face
            name="Jed"
            streak={86}
            src={require("@/assets/images/faces/face-2.jpg")}
          />
        </Hover>
        <Hover top={200} left={0}>
          <Face
            name="Jeff"
            streak={32}
            src={require("@/assets/images/faces/face-3.jpg")}
          />
        </Hover>
        <Hover top={180} left={160}>
          <Face
            name="James"
            streak={32}
            src={require("@/assets/images/faces/face-4.jpg")}
          />
        </Hover>
        <Hover top={160} left={320}>
          <Face
            name="Jake"
            streak={32}
            src={require("@/assets/images/faces/face-4.jpg")}
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
            variant="white"
            text="Get started"
            onPress={async () => {
              const randomUid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
              await signUp(`test-${randomUid}@test.com`, "test123456");

              // Add delay so the loading indicator is visible while we redirect the user
              await new Promise((resolve) => setTimeout(resolve, 2000));
            }}
          />
          {/* <Button
            variant="outline"
            text="Continue with Apple"
            iconL={
              <Image
                source={require("@/assets/images/apple.svg")}
                style={{ width: 22, height: 22 }}
              />
            }
            onPress={async () => {
              await signIn("test@test.com", "test123456");
            }}
          />
          <Button
            variant="outline"
            text="Continue with Google"
            iconL={
              <Image
                source={require("@/assets/images/google.svg")}
                style={{ width: 22, height: 22 }}
              />
            }
            onPress={async () => {
              await signIn("test@test.com", "test123456");
            }}
          /> */}
        </View>
      </View>
    </View>
  );
}
