import { User } from "@folded/types";
import { beforeUserCreated as beforeUserCreatedCallback } from "firebase-functions/v2/identity";

import { db } from "../common/firebase";

export const beforeUserCreated = beforeUserCreatedCallback(async (event) => {
  if (!event.data) {
    throw new Error("No user data provided");
  }

  const data = event.data;

  const user: User = {
    version: "0.0.0",
    uid: data.uid,
    email: data.email || null,
    displayName: data.displayName || null,
    photoURL: data.photoURL || null,
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
    streak: {
      start: Date.now(),
    },
    message: null,
    guardian: {
      guardianId: null,
      buddy: {
        userId: null,
      },
    },
    messaging: {
      token: null,
      createdAt: null,
    },
  };

  // Create a new user document in Firestore
  await db.collection("users").doc(data.uid).set(user);
});
