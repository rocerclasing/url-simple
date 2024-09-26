import { useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  deleteDoc,
  updateDoc
} from "firebase/firestore/lite";
import { nanoid } from "nanoid";

export const useFirestore = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState({});
  const uid = auth.currentUser?.uid;

  // Helper function to check authentication
  const checkAuth = () => {
    if (!uid) {
      setError("User not authenticated");
      return false;
    }
    return true;
  };

  // Fetch data from Firestore
  const getData = async () => {
    if (!checkAuth()) return;

    try {
      setLoading((prev) => ({ ...prev, getData: true }));

      const dataRef = collection(db, "urls");
      const q = query(dataRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      const dataDB = querySnapshot.docs.map((doc) => doc.data());
      setData(dataDB);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };

  // Add data to Firestore
  const addData = async (url) => {
    if (!checkAuth()) return;

    try {
      setLoading((prev) => ({ ...prev, addData: true }));

      const newDoc = {
        enabled: true,
        nanoid: nanoid(6),
        origin: url,
        uid: uid,
      };

      const docRef = doc(db, "urls", newDoc.nanoid);
      await setDoc(docRef, newDoc);

      setData((prevData) => [...prevData, newDoc]);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };

  // Delete data from Firestore
  const deleteData = async (nanoid) => {
    if (!checkAuth()) return;

    try {
      setLoading((prev) => ({ ...prev, [nanoid]: true }));
      
      const docRef = doc(db, "urls", nanoid);
      await deleteDoc(docRef);
      
      setData((prevData) => prevData.filter((item) => item.nanoid !== nanoid));
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      //[] caracteres id por el guion[]
      setLoading((prev) => ({ ...prev,  [nanoid]: false }));
    }
  };

  //update
  const updateData = async(nanoid,newOrigin) => {

    try {
      setLoading((prev) => ({ ...prev, updateData: true }));
      
      const docRef = doc(db, "urls", nanoid);
      await updateDoc(docRef,{origin:newOrigin})
      //modificar los datos en forma local
      setData(data.map(item => item.nanoid === nanoid ? ({...item, origin: newOrigin}) : item))
      
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      //[] caracteres id por el guion[]
      setLoading((prev) => ({ ...prev,  updateData: false }));
    }

  }

  return {
    data,
    error,
    loading,
    getData,
    addData,
    deleteData,  // Renamed for consistency
    updateData
  };
};
