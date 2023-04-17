import React, { createContext, useContext, useEffect, useState } from 'react';
import { onSnapshot, doc, setDoc, getFirestore, collection, query, where, addDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { useAuthContext } from './AuthContext';
import { app, auth, db } from '../firebase';


const TodoContext = createContext();

const TodoProvider = ({ children }) => {

  const { user } = useAuthContext();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getUserTodos = async () => {
      // fetch soltanto se esiste l'user uid
      if (user?.uid) {
        // query firebase
        const q = query(collection(db, "todos"), where("userId", "==", user?.uid));

        // Ascolta le modifiche alla query e aggiorna i todos in base alle modifiche
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const todosArray = [];
          // Ciclo i documenti ottenuti da firebase
          querySnapshot.forEach((doc) => {
            todosArray.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          // Aggiorna i todos nello stato
          setTodos(todosArray);
        });

        // Quando l'utente esce dalla pagina, smette di ascoltare le modifiche alla query
        return () => unsubscribe();
      }


    };

    getUserTodos();
  }, [user?.uid]);



  const addTodo = async (description) => {
    await addDoc(collection(db, "todos"), {
      description: description,
      completed: false,
      userId: user.uid
    });
  }

  const updateTodo = async(docId, description) => {
    const taskRef = doc(db, "todos", docId);
    await updateDoc(taskRef, {description: description});
  }

  const deleteTodo = async(docId) => {
    const taskRef = doc(db, "todos", docId);
    await deleteDoc(taskRef);
  }


  return <TodoContext.Provider value={{ addTodo, todos, deleteTodo, updateTodo }}>
    {children}
  </TodoContext.Provider>
}

const useTodoContext = () => {
  return useContext(TodoContext);
}


export { useTodoContext, TodoProvider }