import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import styles from "../styles/SignIn.module.css";

const SignIn = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const url = import.meta.env.VITE_API_URL + "/login";
    const resp = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const tokenPayload = await resp.json();
    console.log(resp.status);
    if (resp.status > 399) {
      setErrorMsg(tokenPayload.error);
    } else {
      localStorage.setItem("currentToken", tokenPayload.token);
      const tokenData = jwtDecode(JSON.stringify(tokenPayload));
      localStorage.setItem(
        "currentTokenExpires",
        JSON.stringify(tokenData.exp)
      );
      localStorage.setItem("currentUser", JSON.stringify(tokenData.user));
      window.location.href = "/";
      //navigate("/", { replace: true });
    }
  };

  return (
    <div className={styles.main}>
      <form action={handleSubmit}>
        <div className={styles.loginform}>
          <h2>Sign in</h2>
          <div className={styles.loginfield}>
            <label htmlFor="email">Email</label>
            <input name="email" />
          </div>
          <div className={styles.loginfield}>
            <label htmlFor="password">Password</label>
            <input name="password" type="password" />
          </div>
          {errorMsg && <div className={styles.error}>{errorMsg}</div>}
          <button type="submit">Continue</button>
          <p>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
