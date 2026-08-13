import styles from "../styles/Timeline.module.css";
import apiCall from "../utils/apiFunctions";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { loggedIn } from "../utils/userInfo";
import { type TemporadaT } from "./types";
import Skeleton from "react-loading-skeleton";

const SKELETON_COUNT = 4;

function Timeline() {
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
          <div className={styles.timeline}>
            {loading
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <div
                  key={i}
                  className={`${styles.container} ${i % 2 == 0 ? styles.left : styles.right
                    }`}
                >
                  <div className={styles.content}>
                    <h2>
                      <Skeleton width={80} />
                    </h2>
                  </div>
                </div>
              ))
              : Array.isArray(data) &&
              data.map((temporada: TemporadaT, i: number) => (
                <div
                  className={`${styles.container} ${i % 2 == 0 ? styles.left : styles.right
                    }`}
                >
                  <Link to={"/temporada/" + temporada.id}>
                    <div className={styles.content}>
                      <h2>{temporada.year}</h2>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
}

export default Timeline;
