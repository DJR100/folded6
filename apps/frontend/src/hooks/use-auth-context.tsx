import { User } from "@folded/types";
import {
  createUserWithEmailAndPassword,
  initializeAuth,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
} from "@react-native-firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "@react-native-firebase/firestore";
import _ from "lodash";
import {
  type PropsWithChildren,
  createContext,
  use,
  useEffect,
  useState,
} from "react";

import { app, db } from "@/lib/firebase";

export const auth = initializeAuth(app);

interface AuthContext {
  user: User | null | undefined;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  onboarding: number | "DONE";
  setOnboarding: React.Dispatch<React.SetStateAction<number | "DONE">>;
  postOnboarding: 0 | 1 | 2 | 3 | "DONE";
  setPostOnboarding: React.Dispatch<
    React.SetStateAction<0 | 1 | 2 | 3 | "DONE">
  >;
  // COMMENTED OUT FOR V1 - Bank connection not required
  // bankConnected: boolean;
  // setBankConnected: React.Dispatch<React.SetStateAction<boolean>>;
  updateUser: (dotkey: string, value: any) => Promise<void>;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>();

  // Local state variables - these will be synced with database state
  const [onboarding, setOnboarding] = useState<number | "DONE">(0);
  const [postOnboarding, setPostOnboarding] = useState<0 | 1 | 2 | 3 | "DONE">(0);
  // COMMENTED OUT FOR V1 - Bank connection not required
  // const [bankConnected, setBankConnected] = useState<boolean>(false);

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await signOutFirebase(auth);

      // Reset all state
      setUser(null);
      setOnboarding(0);
      setPostOnboarding(0);
      // COMMENTED OUT FOR V1
      // setBankConnected(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Initial user loading - this handles the first-time user fetch
  useEffect(() => {
    const readUser = async () => {
      if (!auth.currentUser?.uid) return;

      const user = (
        await getDoc(doc(db, "users", auth.currentUser?.uid))
      ).data() as User | undefined;

      return user;
    };

    const unsubscribeAuthState = auth.onAuthStateChanged(async () => {
      setUser(await readUser());
    });

    return () => {
      unsubscribeAuthState();
    };
  }, []);

  // ✅ THIS IS THE KEY CHANGE - Sync local state with database state
  useEffect(() => {
    if (!user) return;

    console.log("🔄 Syncing local state with database state...");
    console.log("User tier from database:", user.tier);

    // ✅ STEP 1: Initialize onboarding state based on user's tier from database
    if (user.tier === 0) {
      // User hasn't completed onboarding yet
      console.log("Setting onboarding state to 0 (not complete)");
      setOnboarding(0);
      setPostOnboarding(0);
    } else {
      // User has completed onboarding (tier > 0)
      console.log("Setting onboarding state to DONE (complete)");
      setOnboarding("DONE");
      setPostOnboarding("DONE");
    }

    // ✅ STEP 2: Initialize bank connection state (COMMENTED OUT FOR V1)
    // const hasBankConnection = !!user.banking?.accessToken;
    // console.log("Bank connection status from database:", hasBankConnection);
    // setBankConnected(hasBankConnection);

    // ✅ STEP 3: Set up real-time listener for ongoing updates
    const snapshotListener = onSnapshot(
      doc(db, "users", auth.currentUser?.uid ?? ""),
      (doc) => {
        const updatedUser = doc.data() as User | undefined;
        if (!updatedUser) return;
        
        console.log("📡 Real-time user update received");
        setUser(updatedUser);
        
        // Update local state when database changes in real-time
        if (updatedUser.tier === 0) {
          setOnboarding(0);
          setPostOnboarding(0);
        } else {
          setOnboarding("DONE");
          setPostOnboarding("DONE");
        }
        
        // COMMENTED OUT FOR V1
        // setBankConnected(!!updatedUser.banking?.accessToken);
      },
    );
    
    return () => {
      snapshotListener();
    };
  }, [user?.uid]); // ✅ Watch user.uid to avoid infinite loops

  const updateUser = async (dotkey: string, value: any) => {
    // dotkey is like "demographic.age" or "tier"
    if (!user) return;

    const keys = dotkey.split(".");
    const newUser = _.cloneDeep(user);
    let current = newUser;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i] as keyof typeof current;
      if (!current[k]) {
        // @ts-expect-error Expected typescript error
        current[k] = {} as any;
      }
      current = current[k] as any;
    }
    const lastKey = keys[keys.length - 1] as keyof typeof current;
    // @ts-expect-error Expected typescript error
    current[lastKey] = value as any;

    setUser(newUser);

    await setDoc(doc(db, "users", user.uid), newUser);
  };

  const value: AuthContext = {
    user,
    signIn,
    signUp,
    signOut,
    isLoading: user === undefined,
    onboarding,
    setOnboarding,
    postOnboarding,
    setPostOnboarding,
    // COMMENTED OUT FOR V1
    // bankConnected,
    // setBankConnected,
    updateUser,
  };
  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuthContext() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error(
      "useAuthContext must be wrapped in a <AuthContextProvider />",
    );
  }
  return value;
}
