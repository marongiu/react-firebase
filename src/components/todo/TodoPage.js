import React from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

const TodoPage = () => {
  return (
    <div className='mx-10 react-color px-5 py-5 w-11/12 sm:w-8/12 mx-auto'>
      <h1 className='mb-5 text-2xl'>Todo App</h1>
      <TodoForm/>
      <TodoList />
    </div>
  )
}

export default TodoPage