import styles from "../styles/Temporades.module.css";
import apiCall from "../utils/apiFunctions";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { loggedIn } from "../utils/userInfo";
import { type TemporadaT } from "./types";

function Temporades() {
  const id = useParams().temporadaId;
  const [data, setData] = useState<TemporadaT>();

  const fetchData = async (id: string) => {
    const dades = await apiCall("get", "/temporada/" + id);
    setData(dades);
  };

  useEffect(() => {
    if (id) fetchData(id);
    else fetchData("");
  }, [id]);

  return (
    data && (
      <div className={`${styles.main} ${loggedIn() ? styles.placeHolder : {}}`}>
        <div className={styles.header}>
          <div className={styles.title}>Temporades</div>
          {!loggedIn() && (
            <Link to={"/signin"} className={styles.button}>
              Log in
            </Link>
          )}
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            {Array.isArray(data) &&
              data.map((temporada: TemporadaT) => (
                <Link to={"/temporada/" + temporada.id}>{temporada.year}</Link>
              ))}
          </div>
        </div>
      </div>
    )
  );
}

export default Temporades;
