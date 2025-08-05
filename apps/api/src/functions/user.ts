import { User } from "@folded/types";
import { beforeUserCreated as beforeUserCreatedCallback } from "firebase-functions/v2/identity";

import { db } from "../common/firebase";

export const beforeUserCreated = beforeUserCreatedCallback(async (event) => {
  if (!event.data) {
    throw new Error("No user data provided");
  }

  const data = event.data;

  // 🔍 CHECK: See if user already exists (to avoid overwriting recovery progress)
  const existingUserDoc = await db.collection("users").doc(data.uid).get();
  const existingUser = existingUserDoc.data() as User | undefined;

  console.log(`🔧 beforeUserCreated called for ${data.uid}`);
  console.log(`📊 Existing user found: ${!!existingUser}`);
  console.log(`📊 Existing streak.start: ${existingUser?.streak?.start}`);

  const user: User = {
    version: "0.0.0",
    uid: data.uid,
    email: data.email || null,
    displayName: data.displayName || null,
    photoURL: data.photoURL || null,
    createdAt: existingUser?.createdAt || Date.now(), // Preserve existing createdAt
    banking: existingUser?.banking || null,
    tier: existingUser?.tier || 0,
    demographic: existingUser?.demographic || {
      gender: null,
      age: null,
      gambling: {
        frequency: null,
        ageStarted: null,
        monthlySpend: null,
        estimatedLifetimeLoss: null,
      },
    },
    // 🎯 CRITICAL FIX: Preserve existing streak data if it exists (don't overwrite recovery progress!)
    streak: existingUser?.streak || {
      start: Date.now(),
    },
    // 🎯 CRITICAL FIX: Preserve existing daily challenge data
    dailyChallenge: existingUser?.dailyChallenge || {
      streakCount: 0,
      lastCompletedDate: null,
      currentWeek: [false, false, false, false, false, false, false],
      currentDayState: "pending",
    },
    message: existingUser?.message || null,
    guardian: existingUser?.guardian || {
      guardianId: null,
      buddy: {
        userId: null,
      },
    },
    messaging: existingUser?.messaging || {
      token: null,
      createdAt: null,
    },
  };

  console.log(`✅ Final streak.start being saved: ${user.streak.start} (${new Date(user.streak.start).toISOString()})`);

  // Create or update user document in Firestore
  await db.collection("users").doc(data.uid).set(user);
});
