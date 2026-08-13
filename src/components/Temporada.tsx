import styles from "../styles/Temporada.module.css";
import apiCall from "../utils/apiFunctions";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { loggedIn } from "../utils/userInfo";
import Icon from "@mdi/react";
import { mdiUndo } from "@mdi/js";
import { type ActuacioT, type TemporadaT } from "./types";

import TargetaTemporada, {
  TargetaTemporadaSkeleton,
} from "./TargetaTemporada";
import Skeleton from "react-loading-skeleton";

const SKELETON_COUNT = 6;

function Temporada() {
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
          <div className={styles.title}>
            {loading ? <Skeleton width={150} /> : "Temporada " + data!.year}
          </div>
          {
            <Link to={"/"} className={styles.backButton}>
              <Icon className={styles.icon} path={mdiUndo} size={1} />
              Tornar
            </Link>
          }
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            {loading
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <TargetaTemporadaSkeleton key={i} />
                ))
              : data!.actuacions &&
                data!.actuacions.map((actuacio: ActuacioT, i: number) => (
                  <TargetaTemporada
                    url={"/actuacio/" + actuacio.id}
                    titol={actuacio.nom}
                    ciutat={actuacio.ciutat.nom}
                    data={actuacio.data}
                    key={i}
                  />
                ))}
          </div>
        </div>
      </div>
    )
  );
}

export default Temporada;
