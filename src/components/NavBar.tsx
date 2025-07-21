import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import styles from "../styles/NavBar.module.css";
import { userLoggedIn, userLogOut } from "../utils/userInfo";

const NavBar = () => {
  type PropsType = {
    loggedIn: boolean;
  };

  const navigate = useNavigate();

  const logOut = () => {
    userLogOut();
    navigate("/");
  };

  function HeaderButton({ loggedIn }: PropsType) {
    if (!loggedIn) {
      return <Link to="/signin">Sign in</Link>;
    }
    return (
      <>
        <div onClick={logOut}>Logout</div>
      </>
    );
  }

  return (
    <>
      {userLoggedIn() && (
        <div className={styles.main}>
          <div className={styles.text}>Mode Administrador</div>
          <div className={styles.button}>
            <HeaderButton loggedIn={userLoggedIn()}></HeaderButton>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default NavBar;
