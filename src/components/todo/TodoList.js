import React from "react";
import Todo from "./Todo";
import { useTodoContext } from "../../context/TodoContext";

const TodoList = () => {
  const { addTask, todos, loading } = useTodoContext();

  if (todos.length > 0 && !loading) {
    return (
      <div className="todolist mt-5">
        <ul>
          {todos.map((todo, index) => {
            return <Todo key={index} {...todo} />;
          })}
        </ul>
      </div>
    );
  }

  if (!loading && !todos.length) {
    return (
      <div className="empty-todo mt-5">
        <p>Nessun todo presente nella lista!</p>
      </div>
    );
  }

  return (
    <div className="mt-5 loading text-center">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default TodoList;
