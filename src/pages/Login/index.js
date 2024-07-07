import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import axios from "axios";
import styles from "./style.module.css";
import { CiUser, CiMail, CiLock } from "react-icons/ci";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isSignup) {
        response = await axios.post("http://localhost:8000/auth/signup", {
          email,
          password,
          name,
        });
        if (response?.data?.success) {
          localStorage.setItem("user", JSON.stringify(response?.data?.newUser));
          setUser(response?.data?.newUser);
          navigate("/home");
        } else {
          alert(response?.data?.message || "An error occurred");
        }
      } else {
        response = await axios.post("http://localhost:8000/auth/login", {
          email,
          password,
        });
        if (response?.data?.success) {
          localStorage.setItem("user", JSON.stringify(response?.data?.user));
          setUser(response?.data?.user);
          navigate("/home");
        } else {
          alert(response?.data?.message || "An error occurred");
        }
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.form_heading}>
          {isSignup ? "Sign Up" : "Login"}
        </h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.details}>
            <label className={styles.label}>Name</label>
            <div className={styles.input_div}>
              <CiUser className={styles.icon} />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.details}>
            <label className={styles.label}>Email</label>
            <div className={styles.input_div}>
              <CiMail className={styles.icon} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                required
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.details}>
            <label className={styles.label}>Password</label>
            <div className={styles.input_div}>
              <CiLock className={styles.icon} />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                required
                className={styles.input}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <center className={styles.center}>
            <button type="submit" className={styles.btn}>
              {isSignup ? "Sign-Up" : "Login"}
            </button>
          </center>
        </form>

        <button onClick={toggleSignup} type="button" className={styles.text}>
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Login;
