import { Redirect, router } from "expo-router";
import { useState } from "react";
import { doc, setDoc } from "@react-native-firebase/firestore";

import { Button, Input, Text, View } from "@/components/ui";
import { auth, useAuthContext } from "@/hooks/use-auth-context";
import { db } from "@/lib/firebase";

export default function CreateAccountScreen() {
  const { signUp, user } = useAuthContext();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user?.tier) return <Redirect href="/dashboard" />;
  if (user) return <Redirect href="/onboarding" />;

  return (
    <View className="flex-1 px-4 py-6 gap-8">
      <View className="gap-2">
        <Text variant="h1" className="text-center">Create your account</Text>
        <Text variant="p" className="text-center" muted>
          Join Folded and start your journey today.
        </Text>
      </View>

      <View className="gap-3">
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          placeholder="First name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button
          variant="accent"
          text="Create Account"
          onPress={async () => {
            await signUp(email.trim(), password);
            const uid = auth.currentUser?.uid;
            if (uid) {
              await setDoc(
                doc(db, "users", uid),
                {
                  uid,
                  email: email.trim(),
                  displayName: firstName || username || null,
                  photoURL: null,
                  createdAt: Date.now(),
                  banking: null,
                  tier: 0,
                  demographic: {
                    gender: null,
                    age: null,
                    gambling: {
                      frequency: null,
                      ageStarted: null,
                      monthlySpend: null,
                      estimatedLifetimeLoss: null,
                    },
                  },
                  streak: { start: Date.now() },
                  message: null,
                  messaging: { token: null, createdAt: null },
                  profile: {
                    username: username || null,
                    firstName: firstName || null,
                  },
                },
                { merge: true }
              );
              router.replace("/onboarding");
            }
          }}
        />

        <View className="items-center gap-2 mt-2">
          <Text variant="sm" muted>
            Already have an account?{" "}
            <Text
              className="text-accent"
              onPress={() => router.replace("/auth/sign-in")}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
