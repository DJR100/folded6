import { useCallback, useEffect, useMemo, useState } from "react";
import { doc, setDoc } from "@react-native-firebase/firestore";

import { 
  DailyChallengeData, 
  PhotoResult, 
  UseDailyChallengeReturn 
} from "@folded/types";
import { db } from "@/lib/firebase";
import { useAuthContext } from "./use-auth-context";

export function useDailyChallenge(): UseDailyChallengeReturn {
  const { user, updateUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second for countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Get daily challenge data with fallback
  const dailyChallenge: DailyChallengeData = user?.dailyChallenge ?? {
    streakCount: 0,
    lastCompletedDate: null,
    currentWeek: [false, false, false, false, false, false, false],
    currentDayState: "pending"
  };

  // Calculate time left in current day (memoized)
  const timeLeftInDay = useMemo(() => {
    const now = currentTime;
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Set to 00:00:00

    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      hours,
      minutes,
      seconds,
      formatted: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    };
  }, [currentTime]);

  // Check if it's a new day since last completion (memoized boolean)
  const isNewDay = useMemo(() => {
    if (!dailyChallenge.lastCompletedDate) return true;

    const lastCompleted = new Date(dailyChallenge.lastCompletedDate);
    const today = new Date();
    
    // Check if last completion was on a different calendar day
    return (
      lastCompleted.getDate() !== today.getDate() ||
      lastCompleted.getMonth() !== today.getMonth() ||
      lastCompleted.getFullYear() !== today.getFullYear()
    );
  }, [dailyChallenge.lastCompletedDate]);

  // Check if streak should be reset (memoized boolean)
  const shouldResetStreak = useMemo(() => {
    if (!dailyChallenge.lastCompletedDate || dailyChallenge.streakCount === 0) {
      return false;
    }

    const lastCompleted = new Date(dailyChallenge.lastCompletedDate);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset if last completion was before yesterday
    return (
      lastCompleted.getDate() !== yesterday.getDate() ||
      lastCompleted.getMonth() !== yesterday.getMonth() ||
      lastCompleted.getFullYear() !== yesterday.getFullYear()
    );
  }, [dailyChallenge.lastCompletedDate, dailyChallenge.streakCount]);

  // Calculate week progress (memoized)
  const weekProgress = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const mondayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert to Monday = 0

    const days = ["M", "TU", "W", "TH", "F", "SA", "SU"] as const;
    
    return days.map((day, index) => ({
      day,
      completed: dailyChallenge.currentWeek[index] || false,
      isToday: index === mondayIndex
    }));
  }, [dailyChallenge.currentWeek]);

  // Determine if challenge should auto-launch (memoized)
  const shouldAutoLaunch = useMemo(() => {
    return (
      isNewDay &&
      dailyChallenge.currentDayState === "pending" &&
      (user?.tier ?? 0) > 0 // Only for onboarded users
    );
  }, [isNewDay, dailyChallenge.currentDayState, user?.tier]);

  // Check if user can start challenge (memoized)
  const canStartChallenge = useMemo(() => {
    return dailyChallenge.currentDayState === "pending";
  }, [dailyChallenge.currentDayState]);

  // Reset for new day (callback function)
  const resetForNewDay = useCallback(async () => {
    if (!user?.uid) return;

    try {
      setIsLoading(true);
      setError(null);

      // Check if we need to reset streak
      const resetStreak = shouldResetStreak;
      
      const updatedData: DailyChallengeData = {
        streakCount: resetStreak ? 0 : dailyChallenge.streakCount,
        lastCompletedDate: dailyChallenge.lastCompletedDate,
        currentWeek: [false, false, false, false, false, false, false], // Reset week
        currentDayState: "pending"
      };

      await updateUser("dailyChallenge", updatedData);

      // Analytics for streak reset
      if (resetStreak) {
        // TODO: Fire analytics event - streak_reset
        console.log("🔥 Streak reset due to missed day");
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset for new day");
      console.error("Error resetting for new day:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.uid, shouldResetStreak, dailyChallenge, updateUser]);

  // Start challenge
  const startChallenge = useCallback(() => {
    // TODO: Fire analytics event - daily_challenge_started
    console.log("📱 Daily challenge started");
  }, []);

  // Complete challenge
  const completeChallenge = useCallback(async (photo?: PhotoResult) => {
    if (!user?.uid) return;

    try {
      setIsLoading(true);
      setError(null);

      const now = new Date();
      const dayOfWeek = now.getDay();
      const mondayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

      // Update current week array
      const newCurrentWeek = [...dailyChallenge.currentWeek];
      newCurrentWeek[mondayIndex] = true;

      const updatedData: DailyChallengeData = {
        streakCount: dailyChallenge.streakCount + 1,
        lastCompletedDate: now.toISOString(),
        currentWeek: newCurrentWeek,
        currentDayState: "completed"
      };

      await updateUser("dailyChallenge", updatedData);

      // TODO: Fire analytics event - daily_challenge_completed
      console.log("✅ Daily challenge completed", { 
        streakCount: updatedData.streakCount,
        photoSource: photo?.type 
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to complete challenge");
      console.error("Error completing challenge:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.uid, dailyChallenge, updateUser]);

  // Skip challenge
  const skipChallenge = useCallback(async () => {
    if (!user?.uid) return;

    try {
      setIsLoading(true);
      setError(null);

      const updatedData: DailyChallengeData = {
        ...dailyChallenge,
        currentDayState: "skipped"
      };

      await updateUser("dailyChallenge", updatedData);

      // TODO: Fire analytics event - daily_challenge_skipped
      console.log("⏭️ Daily challenge skipped");

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to skip challenge");
      console.error("Error skipping challenge:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.uid, dailyChallenge, updateUser]);

  // Auto-reset for new day when component mounts or day changes
  useEffect(() => {
    if (isNewDay && dailyChallenge.currentDayState !== "pending") {
      resetForNewDay();
    }
  }, [isNewDay, dailyChallenge.currentDayState, resetForNewDay]);

  return {
    // Data
    dailyChallenge,
    isLoading,
    error,
    
    // Computed values
    timeLeftInDay,
    shouldAutoLaunch,
    canStartChallenge,
    weekProgress,
    
    // Actions
    startChallenge,
    completeChallenge,
    skipChallenge,
    resetForNewDay
  };
} 