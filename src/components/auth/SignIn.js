import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuthContext();

  const handleSignIn = async (e) => {
    // sign in
    e.preventDefault();
    // reset input
    setError("");

    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="sign-in-container w-11/12 container-480 mx-auto">
      <form onSubmit={handleSignIn} className="flex flex-col gap-3">
        <h1 className="text-xl">Login to your account</h1>
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
          <Link to="/signup">Create an account if you do not have one.</Link>
        </div>
        <button className="bg-blue-500 text-white p-2" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
