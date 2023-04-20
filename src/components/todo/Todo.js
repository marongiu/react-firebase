import React, { useState } from "react";

import { useTodoContext } from "../../context/TodoContext";
import { RiEdit2Line } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";

const Todo = ({ id, description, completed }) => {
  const { deleteTodo, updateTodo } = useTodoContext();
  const [inputUpdate, setInputUpdate] = useState(description);
  const [inputVisibility, setInputVisibility] = useState(false);

  // On enter modifico il todo e nascondo l'input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      updateTodo(id, inputUpdate);
      setInputVisibility(false);
    }
  };

  return (
    <li className="task-shadow bg-white py-3 px-5 mb-2 flex justify-between items-center">
      <div className="todo flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => updateTodo(id, description, e.target.checked)}
        />
        {!inputVisibility ? (
          <span className={`${completed && "line-through"} description`}>
            {description}
          </span>
        ) : (
          <input
            type="text"
            className="p-1 border-gray-500 border outline-none"
            placeholder="Modifica il todo..."
            value={inputUpdate}
            onChange={(e) => setInputUpdate(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        )}
      </div>
      <div className="commands flex gap-3">
        {!inputVisibility && (
          <RiEdit2Line
            title="Modifica todo"
            className="text-gray-500 text-xl cursor-pointer"
            onClick={() => setInputVisibility(true)}
          />
        )}
        <BsFillTrashFill
          title="Rimuovi todo"
          className=" text-black text-xl cursor-pointer"
          onClick={() => deleteTodo(id)}
        />
      </div>
    </li>
  );
};

export default Todo;
