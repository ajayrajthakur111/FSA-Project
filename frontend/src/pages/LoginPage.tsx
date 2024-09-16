import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { AppDispatch, RootState } from "../redux/store/store";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import CSS Styles
import { setToastActive } from "../redux/slices/toastSlice";
import Button from "../components/Button";
import { ToastCompnent } from "../toast/ToastComponent";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isToastComponentActive } = useSelector(
    (state: RootState) => state.toastInfo
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        dispatch(loginSuccess(data.username));
        dispatch(setToastActive(true));
        setTimeout(() => {
          dispatch(setToastActive(false));
          navigate("/blogs");
        }, 1900);
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="alert">{error}</div>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button type="submit" label="Login"  backgroundColor="#0056b3" />
      </form>
      {isToastComponentActive && (
        <ToastCompnent
          message="Login successfull"
          type="success"
        />
      )}
    </>
  );
};
