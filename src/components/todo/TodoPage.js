import React from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import OrderTodoButton from "../ui/OrderTodoButton";
import { BsSun } from "react-icons/bs";

const TodoPage = () => {
  const todayDate = () => {
    const today = new Date();
    const options = { weekday: "long", day: "numeric", month: "long" };
    const formatDate = today.toLocaleDateString("it-IT", options);
    return formatDate;
  };

  return (
    <div className="container mx-auto mx-10 px-5">
      <div className="presentation mb-5">
        <h1 className="text-xl flex items-center gap-2">
          <BsSun /> La mia giornata
        </h1>
        <div className="date flex justify-between items-center">
          <small className="text-xs text-gray-600">{todayDate()}</small>
          <OrderTodoButton />
        </div>
      </div>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default TodoPage;
