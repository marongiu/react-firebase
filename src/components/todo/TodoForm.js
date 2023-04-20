import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { useTodoContext } from "../../context/TodoContext";
import Calendar from "react-calendar";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCalendar2X } from "react-icons/bs";

const TodoForm = () => {
  const { addTodo } = useTodoContext();
  const [input, setInput] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [calendarVisibility, setCalendarVisibility] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length > 2) {
      addTodo(input, selectedDate ? Timestamp.fromDate(selectedDate) : null);
      setInput("");
      setSelectedDate("");
    }
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setCalendarVisibility(false);
  };

  return (
    <div className="addTask task-shadow mt-10" onSubmit={handleSubmit}>
      <form className="flex gap-2 items-center border-b border-neutral-200 bg-white py-2 px-5">
        <button className="color-app" disabled={input.length < 2}>
          <AiOutlinePlus
            className={`${
              input.length > 2 ? "color-app" : "text-gray-300"
            } font-medium text-2xl`}
          />
        </button>
        <input
          type="text"
          className="w-full p-2 text-sm focus:outline-none placeholder-color-app font-medium"
          placeholder="Aggiungi un'attività"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <div className="expiring bg-neutral-100 px-6 border-b border-neutral-200 py-3">
        <div className="icon flex items-center gap-2">
          <BsCalendar2X
            title="Aggiungi scadenza"
            className="text-black text-md cursor-pointer"
            onClick={() => setCalendarVisibility(!calendarVisibility)}
          />
          {selectedDate && (
            <div className="date text-sm text-gray-500">
              Scadenza: <small>{selectedDate?.toLocaleDateString()}</small>
            </div>
          )}
        </div>
        {calendarVisibility && (
          <div className="calendar absolute">
            <Calendar onChange={handleSelectDate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoForm;
