/* eslint-disable no-unused-vars */

import { useState, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";


import {
  addDoc,
  serverTimestamp,
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../utils/firebase";
import Editor from "./Editor.jsx";
import { useNavigate } from "react-router-dom";

function Productive() {
  const navigate = useNavigate()
  const [user, loading] = useAuthState(auth);
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const toDoScrollEndRef = useRef(null);

  const scrollToBottom = () => {
    toDoScrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [todoList]);

  useEffect(() => {
    getData();
  }, [user, loading]);

  const handleAddToDo = async (e) => {
    setInputValue(e.target.value);
    if (e.keyCode === 13) {
      const collectionRef = collection(db, "todos");
      await addDoc(collectionRef, {
        user: uuidv4(),
        userId: user.uid,
        value: inputValue,
        createdAt: serverTimestamp(),
        completed: false,
      });
      setInputValue("");
    }
  };
  const toggleToDo = (userid) => {
    const findTodo = todoList.find((item) => item.user === userid);
    return !findTodo.completed;
  };
  const updateTodo = async (id, userid) => {
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, {
      completed: toggleToDo(userid),
    });
  };

  const deleteTodo = async (id) => {
    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef);
  };
  const getData = async () => {
    if (loading) return;
    if (!user) return navigate("/");
    const collectionRef = collection(db, "todos");
    const q = query(collectionRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let arr = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      let order = arr
        .map((item) => ({
          ...item,
          createdAt: item.createdAt ? item.createdAt.toDate() : null,
        }))
        .sort((a, b) => a.createdAt - b.createdAt);
      setTodoList(order);
    });
    return unsubscribe;
  };

  return (
  
    <div className="lg:flex-row lg:p-4 lg:w-11/12 lg:mx-auto lg:justify-evenly lg:gap-2 md:gap-2 flex flex-col items-center">
      <div className="lg:w-1/3 md:w-1/2 todo w-3/4 mt-6 pb-10">
        <input
          className="px-4 py-2 mb-2 w-full outline-none rounded-md text-xs placeholder-lightgrey text-gray-200 bg-transparent border-[1px] border-greyBlue"
          type="text"
          placeholder=""
          enterKeyHint="done"
          value={inputValue}
          onChange={handleAddToDo}
          onKeyDown={handleAddToDo}
        />
        <div className="p-2 lg:h-[400px] md:h-[300px] text-gray-200 overflow-auto scrollbar h-[200px] rounded-2">
          <ul className="">
            {todoList.map((todo) => (
              <li key={todo.id} className="flex mt-2 items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => updateTodo(todo.id, todo.user)}
                  className="form-checkbox h-4 w-4 rounded-md text-transparent bg-transparent border-greyBlue focus:ring-offset-0 focus:ring shadow-sm focus:ring-greyBlue focus:ring-opacity-5"
                />
                <p
                  className={`ml-2 text-sm ${
                    todo.completed
                      ? "line-through text-lightgrey"
                      : "text-gray-200"
                  }`}
                >
                  {todo.value}
                </p>
                <span
                  className="ml-auto text-lightgrey cursor-pointer hover:text-white mr-4"
                  onClick={() => deleteTodo(todo.id)}
                >
                  &times;
                </span>
              </li>
            ))}
    
          </ul>
        </div>
      </div>
      <div className="lg:mt-0 lg:w-1/2 md:w-1/2 thoughts mt-2 w-3/4">
        <Editor />
      </div>
    </div>
  );
}
export default Productive;
