import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import styles from "../styles/NavBar.module.css";
import { loggedIn, userLogOut } from "../utils/userInfo";

const NavBar = () => {
  type PropsType = {
    loggedIn: boolean;
  };

  const navigate = useNavigate();

  const logOut = () => {
    userLogOut();
    navigate("/");
  };

  return (
    <>
      {loggedIn() && (
        <div className={styles.main}>
          <div className={styles.text}>Mode Administrador</div>
          <div className={styles.button}>
            <div onClick={logOut}>Sortir</div>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default NavBar;
