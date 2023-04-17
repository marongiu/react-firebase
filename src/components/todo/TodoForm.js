import React, {useState} from 'react'
import { useTodoContext } from '../../context/TodoContext'

const TodoForm = () => {


  const {addTodo} = useTodoContext();
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(input.length > 2) {
      addTodo(input);
      setInput('');
    }
  }

  return (
    <div className='addTask' onSubmit={handleSubmit}>
      <form className='flex-col flex sm:flex-row gap-2 items-center'>
        <input
          type='text'
          className="w-full p-2"
          placeholder='Aggiungi un todo...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className='bg-orange-400 py-2 px-4 text-white'>
          +
        </button>
      </form>
    </div>
  )
}

export default TodoForm