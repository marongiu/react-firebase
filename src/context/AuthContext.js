import React, { createContext, useContext, useEffect, useState } from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {auth} from '../firebase';




const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({});


  const createUser = (email,password) => {
    return createUserWithEmailAndPassword(auth,email,password);
  }

  const signIn = (email,password) => {
    return signInWithEmailAndPassword(auth, email,password);
  }

  const logout = () => {
    return signOut(auth);
  }

  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });



    return () => {
      unsubscribe();
    }

  },[]);


  return <AuthContext.Provider value={{createUser, user, signIn, logout}}>
    {children}
  </AuthContext.Provider>
}

const useAuthContext = () => {
  return useContext(AuthContext);
}


export { AuthProvider, useAuthContext }