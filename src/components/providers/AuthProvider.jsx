// AuthProviders.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile as fbUpdateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import LoadingSpinner from "../LoadingSpinner";

// Create Context
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Observe auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Robust registerUser: create -> update profile (optional) -> reload -> setUser -> return user
  const registerUser = async (email, password, name = null, photoURL = null) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const createdUser = result.user;

      // If profile info provided -> update
      if (name || photoURL) {
        const profile = {};
        if (name) profile.displayName = name;
        if (photoURL) profile.photoURL = photoURL;

        await fbUpdateProfile(createdUser, profile);

        // reload auth.currentUser so SDK & onAuthStateChanged reflect changes
        if (auth.currentUser && typeof auth.currentUser.reload === "function") {
          await auth.currentUser.reload();
        } else if (createdUser && typeof createdUser.reload === "function") {
          await createdUser.reload();
        }
      }

      // Prefer fresh auth.currentUser if available
      const fresh = auth.currentUser || createdUser;
      setUser(fresh);
      return { user: fresh };
    } catch (err) {
      console.error("registerUser error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      // reload to be safe
      if (auth.currentUser && typeof auth.currentUser.reload === "function") {
        await auth.currentUser.reload();
      }
      setUser(auth.currentUser || res.user);
      return res;
    } catch (err) {
      console.error("loginUser error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (auth.currentUser && typeof auth.currentUser.reload === "function") {
        await auth.currentUser.reload();
      }
      setUser(auth.currentUser || res.user);
      return res;
    } catch (err) {
      console.error("loginWithGoogle error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Robust updateUserProfile wrapper:
  // Supports both: updateUserProfile(profile)  OR  updateUserProfile(user, profile)
  const updateUserProfile = async (userOrProfile, maybeProfile) => {
    setLoading(true);
    try {
      let targetUser;
      let profile;

      if (maybeProfile) {
        // Called as updateUserProfile(user, profile)
        targetUser = userOrProfile;
        profile = maybeProfile;
      } else {
        // Called as updateUserProfile(profile)
        targetUser = auth.currentUser;
        profile = userOrProfile;
      }

      if (!targetUser) {
        throw new Error("No authenticated user to update.");
      }

      await fbUpdateProfile(targetUser, profile);

      // reload to ensure SDK & onAuthStateChanged reflect changes
      if (targetUser && typeof targetUser.reload === "function") {
        await targetUser.reload();
      } else if (auth.currentUser && typeof auth.currentUser.reload === "function") {
        await auth.currentUser.reload();
      }

      const fresh = auth.currentUser || targetUser;
      setUser(fresh);
      return { user: fresh };
    } catch (err) {
      console.error("updateUserProfile wrapper error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("logout error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    loginWithGoogle,
    updateUserProfile,
    logoutUser,
    setLoading
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProviders;
