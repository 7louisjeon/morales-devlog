import React, { useState } from "react";
import { axiosInstance } from "../config";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="right-bottom-content register">
      <form className="right-bottom-content-inner" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <h3>Username</h3>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <h3>Email</h3>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <h3>Password</h3>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="loginBtn">
          <h1>Register</h1>
        </button>
        {error && (
          <h1>
            Username or Email already exists. Find your ID or try different
            credentials.
          </h1>
        )}
      </form>
    </div>
  );
}

export default Register;
