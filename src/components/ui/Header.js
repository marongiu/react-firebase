import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext';
const Header = () => {


  const { logout, user } = useAuthContext();

  return (
    <header className='bg-black p-3'>
      <div className='container mx-auto flex justify-between items-center text-white'>
        <div><Link to="/"><img className="w-14" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png?20220125121207" /></Link></div>
        {
          user ? (<div className="account">
          <p>Bentornato!</p>
          <button
            className='bg-orange-400 px-2 py-0.5 mt-2'
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>) : ('')
        }
      </div>
    </header>
  )
}

export default Header