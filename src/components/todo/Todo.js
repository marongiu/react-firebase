import React, { useState } from 'react'
import { useTodoContext } from '../../context/TodoContext'

const Todo = ({ id, description, completed }) => {

  const { deleteTodo, updateTodo } = useTodoContext();
  const [inputUpdate, setInputUpdate] = useState(description);
  const [inputVisibility, setInputVisibility ] = useState(false);

  // Modifico valore dell'input
  const handleInputUpdate = (e) => {
    setInputUpdate(e.target.value);
  }

  // On enter modifico il todo e nascondo l'input
  const handleKeyPress = (e) => {
    if(e.key === "Enter") {
       updateTodo(id, inputUpdate);
       setInputVisibility(false)
    }
  }

  return (
    <li className='bg-gray-200 p-2 mb-2 flex justify-between items-center'>
      <span className="description">
        {description}
      </span>
      {
        inputVisibility ? (
          <input
            type="text"
            className='p-1'
            placeholder='Modifica il todo...'
            value={inputUpdate}
            onChange={handleInputUpdate}
            onKeyPress={handleKeyPress}
          />
        ) : ('')
      }
      <div className="commands flex gap-2">
        <button className='bg-green-500 text-white text-xs py-1 px-3' onClick={() => setInputVisibility(true)}>
          UPDATE
        </button>
        <button className='bg-red-500 text-white text-xs py-1 px-3' onClick={() => deleteTodo(id)}>
          REMOVE
        </button>
      </div>
    </li>
  )
}

export default Todo