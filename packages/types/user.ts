import { Banking } from "./banking";
import { Range } from "./primitives";

export interface SpendMeta {
  monthlySpendAssumptionUSD: number;
  usdPerMs: number;
}

export interface User {
  version: string;
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: number;
  banking: Banking | null;
  tier: number;
  demographic: {
    gender: "male" | "female" | "non-binary" | null;
    age: Range | null; //Age range
    gambling: {
      frequency: "daily" | "weekly" | "monthly" | null;
      ageStarted: Range | null;
      monthlySpend: Range | null;
      estimatedLifetimeLoss: number | null;
    };
  };
  streak: {
    start: number; // Timestamp
  };
  message: string | null;
  guardian: {
    guardianId: string | null;
    buddy: {
      userId: string | null; // The user who's guardian you bought
    };
  };
  messaging: {
    token: string | null;
    createdAt: number | null;
  };
  spendMeta?: SpendMeta;
}
