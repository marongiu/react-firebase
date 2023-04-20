import React, { useState } from "react";
import { BsArrowDownUp } from "react-icons/bs";
import { useTodoContext } from "../../context/TodoContext";

const OrderTodoButton = () => {
  const { setOrderQuery } = useTodoContext();
  const [selectVisibility, setSelectVisibility] = useState(false);

  const handleOrderQuery = (e) => {
    setOrderQuery(JSON.parse(e.target.value));
    setSelectVisibility(false);
  };

  return (
    <div className="order-container relative">
      <div className="orderButton">
        <button
          className="flex gap-2 items-center text-md text-gray-600 cursor-pointer"
          onClick={() => setSelectVisibility(true)}
        >
          <BsArrowDownUp />
          Ordina
        </button>
      </div>
      {selectVisibility && (
        <div className="selectQuery absolute top-5 right-0 bg-white task-shadow border border-neutral-200 p-2 mt-2">
          <select
            className="bg-white"
            onChange={(e) => handleOrderQuery(e)}
          >
            <option>Seleziona</option>
            <option
              value={JSON.stringify({
                sortBy: "createdAt",
                sortDirection: "desc",
              })}
            >
              Data di creazione
            </option>
            <option
              value={JSON.stringify({
                sortBy: "expiration",
                sortDirection: "asc",
              })}
            >
              Data di scadenza
            </option>
          </select>
        </div>
      )}
    </div>
  );
};

export default OrderTodoButton;
