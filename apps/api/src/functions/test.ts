import { NotificationType, User } from "@folded/types";
import { HttpsError, onCall } from "firebase-functions/v2/https";

import { db } from "@/common/firebase";
import { createNotification } from "@/common/notification";

export const performFakeGambling = onCall(async (request) => {
  // Get uid
  const uid = request.auth?.uid;
  if (!uid) {
    throw new HttpsError("unauthenticated", "User is not authenticated");
  }

  // Reset user's streak
  await db.collection("users").doc(uid).update({
    "streak.start": Date.now(),
  });

  // Create notification
  await createNotification(uid, {
    notificationId: crypto.randomUUID(),
    type: NotificationType.RELAPSE,
    data: {
      value: 100,
      transactions: [
        {
          transactionId: crypto.randomUUID(),
          amount: 100,
          date: Date.now(),
          currency: "USD",
          name: "Gambling",
          category: {
            confidence: "HIGH",
            primary: "Gambling",
            detailed: "Gambling",
          },
          merchant: {
            name: "Stake",
            website: "https://www.stake.com",
          },
          // channel:
          //   | "ATM"
          //   | "DEBIT"
          //   | "CREDIT"
          //   | "TRANSFER"
          //   | "CASH"
          //   | "IN_STORE"
          //   | "OTHER";
          location: {
            address: "123 Main St",
            city: "New York",
            country: "USA",
            postalCode: "10001",
            region: "NY",
            storeNumber: "123",
            lat: 40.7128,
            lon: -74.006,
          },
          // Raw data received from the provider
          raw: {
            provider: "plaid",
            data: {},
          },
        },
      ],
    },
    createdAt: Date.now(),
  });
});

export const helloEmail = onCall(async () => {
  // // Get uid
  // const uid = request.auth?.uid;
  // if (!uid) {
  //   throw new HttpsError("unauthenticated", "User is not authenticated");
  // }

  const uid = "wLxlWduAmiTYP71xje2nhkxdkOz1";

  // Get user
  const userDoc = await db.collection("users").doc(uid).get();
  if (!userDoc.exists) {
    throw new HttpsError("not-found", "User not found");
  }

  const user = userDoc.data() as User;

  return { email: user.email, message: "Hello" };
});
