import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
 
  //para renderizar la primera vez

  useEffect(() => {

            //metodo que trae al usuario
      const unsusbribe = onAuthStateChanged(auth, (user) => {
         // console.log(user);
          //si existe el usuario
          if (user) {
              const { email, photoURL, displayName, uid } = user;
              setUser({ email, photoURL, displayName, uid });
          } else {
              setUser(null);
          }
      });


      return () => unsusbribe();
  }, []);

  //registrar usuario 
  const registerUser = (email, password) =>
      createUserWithEmailAndPassword(auth, email, password);

  //loguear usuario 
  const loginUser = (email, password) =>
      signInWithEmailAndPassword(auth, email, password);



  const signOutUser = () => signOut(auth);

  return (
      <UserContext.Provider
          value={{ user, setUser, registerUser, loginUser, signOutUser }}
      >
          {children}
      </UserContext.Provider>
  );
};

export default UserProvider;