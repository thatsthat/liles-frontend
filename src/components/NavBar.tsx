import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import styles from "../styles/NavBar.module.css";
import { loggedIn, userLogOut } from "../utils/userInfo";

const NavBar = () => {
  const [trigger, setTrigger] = useState<number>(0);
  const reRender = () => {
    setTrigger((a) => a + 1);
  };
  const nav = useNavigate();

  const logOut = () => {
    userLogOut();
    nav("/");
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
      <Outlet context={[reRender, trigger]} />
    </>
  );
};

export default NavBar;
