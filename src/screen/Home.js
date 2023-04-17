import React from 'react'
import SignIn from '../components/auth/SignIn'
import { useAuthContext } from '../context/AuthContext'
import TodoPage from '../components/todo/TodoPage';

const Home = () => {
  
  const {user, logout, addTask} = useAuthContext();


  if(!user) {
    return (
      <div className='home my-10'>
        <SignIn/>
      </div>
    )
  }

  return (
    <div className='home my-10'>
      <TodoPage/>
    </div>
  )
}

export default Home