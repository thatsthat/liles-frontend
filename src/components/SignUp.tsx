import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import styles from "../styles/SignUp.module.css";

type SignUpForm = {
  name: string;
  email: string;
  password: string;
  get: (arg: string) => string;
};

const SignUp = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (data: SignUpForm) => {
    const formData = {
      email: data.get("email"),
      name: data.get("name"),
      password: data.get("password"),
    };
    const url = import.meta.env.VITE_API_URL + "/signup";
    const resp = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const tokenPayload = await resp.json();
    console.log(resp.status);
    if (resp.status == 403) {
      setErrorMsg(tokenPayload.error);
    } else {
      navigate("/signin", { replace: true });
    }
  };

  return (
    <div className={styles.main}>
      <form action={handleSubmit}>
        <div className={styles.loginform}>
          <h2>Sign up</h2>
          <div className={styles.loginfield}>
            <label htmlFor="name">Name</label>
            <input name="name" />
          </div>
          <div className={styles.loginfield}>
            <label htmlFor="email">Email</label>
            <input name="email" />
          </div>
          <div className={styles.loginfield}>
            <label htmlFor="password">Password</label>
            <input name="password" type="password" />
          </div>
          <div className={styles.loginfield}>
            <label htmlFor="password2">Repeat Password</label>
            <input name="password2" type="password" />
          </div>
          {errorMsg && <div className={styles.error}>{errorMsg}</div>}
          <button type="submit">Continue</button>
          <p>
            Already have an account? <Link to="/signin">Log in</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
