import styles from "../styles/Temporades.module.css";
import apiCall from "../utils/apiFunctions";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { loggedIn } from "../utils/userInfo";
import { type TemporadaT } from "./types";
import Skeleton from "react-loading-skeleton";

const SKELETON_COUNT = 6;

function Temporades() {
  const id = useParams().temporadaId;
  const [data, setData] = useState<TemporadaT>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiCall("get", "/temporada/" + (id ?? ""))
      .then((dades: TemporadaT) => setData(dades))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    (loading || data) && (
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
            {loading
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <Skeleton key={i} width={60} />
                ))
              : Array.isArray(data) &&
                data.map((temporada: TemporadaT) => (
                  <Link to={"/temporada/" + temporada.id}>
                    {temporada.year}
                  </Link>
                ))}
          </div>
        </div>
      </div>
    )
  );
}

export default Temporades;
