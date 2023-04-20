import React, { useState } from "react";
import { createUser, useAuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createUser } = useAuthContext();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    // sign in
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <div className="sign-in-container w-11/12 container-480 mx-auto mt-10">
      <form onSubmit={handleSignUp} className="flex flex-col gap-3">
        <h1 className="text-xl">Sign up</h1>
        {error ? (
          <p className="bg-red-600 p-2 text-white text-xs">{error}</p>
        ) : (
          ""
        )}
        <input
          className="border border-black p-2"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-black p-2"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="underline text-sm text-gray-500">
          <Link to="/">Do you already have an account?</Link>
        </div>
        <button className="bg-blue-500 text-white p-2" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
