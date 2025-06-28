import styles from "../styles/ActuacioDetalls.module.css";
import { useState, useEffect } from "react";
import apiCall from "../utils/apiFunctions";
import { useParams, Link } from "react-router";
import Icon from "@mdi/react";
import { mdiUndo, mdiCalendar, mdiMapMarker } from "@mdi/js";

type Castell = {
  nom: string;
  resultat: string;
  id: number;
  actuacioId: number;
};

type Actuacio = {
  id: number;
  data: string;
  nom: string;
  dataHora: Date | null;
  ciutat: string;
  ciutatLloc: string | null;
  castells: Castell[];
  temporadaId: number;
};

function ActuacioDetalls() {
  const id = useParams().actuacioId;
  const [actuacio, setActuacio] = useState<Actuacio>();

  const fetchActuacio = async (id: string) => {
    const dadesActuacio: Actuacio = await apiCall("get", "/actuacio/" + id);
    setActuacio(dadesActuacio);
  };

  useEffect(() => {
    if (id) fetchActuacio(id);
  }, [id]);
  return (
    actuacio && (
      <div className={styles.main}>
        <Link
          to={"/temporada/" + actuacio.temporadaId}
          className={styles.backButton}
        >
          <Icon className={styles.icon} path={mdiUndo} size={1} />
          Tornar
        </Link>
        <div className={styles.nomDiada}>{actuacio.nom}</div>
        <div className={styles.diaIlloc}>
          <div>
            <Icon className={styles.icon} path={mdiCalendar} size={1} />
            {new Intl.DateTimeFormat("en-GB").format(new Date(actuacio.data))}
          </div>
          <div>
            <Icon className={styles.icon} path={mdiMapMarker} size={1} />
            {actuacio.ciutat}
          </div>
        </div>
        <div className={styles.castells}>
          {actuacio.castells.map((c, i) => (
            <div className={styles.castell} key={i}>
              {c.nom}
              {": " + c.resultat}
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default ActuacioDetalls;
