import React, { useState, useEffect, useCallback } from 'react';
import { getAuth, signOut as signOutFromFirebase, signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';

const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, setCurrentUser);
  }, [])

  const signIn = useCallback(function() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    //signInWithRedirect(auth, provider);
    signInWithPopup(auth, provider).then((result) => {
      console.log('[AUTH CONTEXT] signed in successfully');
    }).catch((error) => {
      console.error('[AUTH CONTEXT] sign in encountered a problem:', error);
    });
  }, []);

  const signOut = useCallback(function() {
    const auth = getAuth();
    signOutFromFirebase(auth).then(() => {
      console.log('[AUTH CONTEXT] signed out successfully');
    }).catch((error) => {
      console.error('[AUTH CONTEXT] sign out encountered a problem:', error);
    }).finally(() => {
      setCurrentUser();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  return React.useContext(AuthContext);
}