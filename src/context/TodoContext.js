import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
  setDoc,
  getFirestore,
  collection,
  orderBy,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  Timestamp,
  fromSeconds,
  toMillis,
} from "firebase/firestore";
import { useAuthContext } from "./AuthContext";
import { app, auth, db } from "../firebase";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderQuery, setOrderQuery] = useState({
    sortBy: "createdAt",
    sortDirection: "desc",
  });

  // Funzione per controllare se il todo è scaduto
  // L'oggetto expiration contiene i secondi
  const checkExpiration = async (docId, expiration) => {
    const taskRef = doc(db, "todos", docId);
    const now = Timestamp.fromDate(new Date());
    const expirationFormatDate = new Date(expiration.seconds * 1000);
    const expirationFormatTimestamp = Timestamp.fromDate(expirationFormatDate);
    // se il giorno di scadenza è piu piccolo di oggi
    if (expirationFormatTimestamp.toMillis() <= now.toMillis()) {
      await deleteDoc(taskRef);
    }
  };

  useEffect(() => {
    const getUserTodos = async () => {
      // fetch soltanto se esiste l'user uid
      if (user?.uid) {
        setLoading(true);
        // query firebase
        const q = query(
          collection(db, "todos"),
          // la data di scadenza deve essere minore della data attuale
          where("userId", "==", user?.uid),
          orderBy(orderQuery.sortBy, orderQuery.sortDirection)
        );

        // Ascolta le modifiche alla query e aggiorna i todos in base alle modifiche
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const todosArray = [];
          // Ciclo i documenti ottenuti da firebase
          querySnapshot.forEach((data) => {
            const todo = data.data();
            checkExpiration(data.id, { ...todo.expiration });
            todosArray.push({
              id: data.id,
              ...todo,
            });
          });
          // Aggiorna i todos nello stato
          setTodos(todosArray);
          setLoading(false);
        });

        // Quando l'utente esce dalla pagina, smette di ascoltare le modifiche alla query
        return () => unsubscribe();
      }
    };

    getUserTodos();
  }, [user?.uid, orderQuery]);

  const addTodo = async (description, expiration = null) => {
    await addDoc(collection(db, "todos"), {
      description: description,
      completed: false,
      userId: user.uid,
      createdAt: Timestamp.fromDate(new Date()),
      expiration: expiration,
    });
  };

  const updateTodo = async (docId, description, completed = false) => {
    const taskRef = doc(db, "todos", docId);
    await updateDoc(taskRef, {
      description: description,
      completed: completed,
    });
  };

  const deleteTodo = async (docId) => {
    const taskRef = doc(db, "todos", docId);
    await deleteDoc(taskRef);
  };

  return (
    <TodoContext.Provider
      value={{ addTodo, todos, deleteTodo, updateTodo, loading, setOrderQuery }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const useTodoContext = () => {
  return useContext(TodoContext);
};

export { useTodoContext, TodoProvider };
