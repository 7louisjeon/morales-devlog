import React, { useContext, useRef, useState } from "react";
import { axiosInstance } from "../config";
import { Context } from "../context/Context";

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      res.data && window.location.replace("/");
      window.alert("Login successful.");
    } catch (err) {
      window.alert("Login failed.");
      setError(true);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="right-bottom-content login">
      <form className="right-bottom-content-inner" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <h3>Username</h3>
        <input type="text" ref={userRef} />
        <h3>Password</h3>
        <input type="password" ref={passwordRef} />
        <button type="submit" className="loginBtn" disabled={isFetching}>
          <h1>Login</h1>
        </button>
        {error && <h1>Login failed. Try different credentials.</h1>}
      </form>
    </div>
  );
}

export default Login;
