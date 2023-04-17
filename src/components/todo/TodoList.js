import React from 'react'
import Todo from './Todo';
import { useTodoContext } from '../../context/TodoContext'

const TodoList = () => {

  const { addTask, todos } = useTodoContext();



  if(todos.length > 0) {
    return (
      <div className="todolist mt-5">
        <ul>
          {
            todos.map((todo,index) => {
              return <Todo key={index} {...todo} />
            })
          }
        </ul>
      </div>
    )
  }

  return (
    <div className="todolist mt-5">
      Nessun todo caricato
    </div>
  )
}

export default TodoList