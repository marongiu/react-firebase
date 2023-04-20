import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
const Header = () => {
  const { logout, user } = useAuthContext();

  return (
    <header className="bg-app py-2 px-5">
      <div className="container mx-auto mx-10 flex justify-between items-center text-white">
        <div className="logo">
          <Link to="/">
            <span className="logo-text text-md font-semibold">To Do</span>
          </Link>
        </div>
        {user ? (
          <div className="account">
            <button className="react px-2 py-0.5" onClick={() => logout()}>
              Logout
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Header;
