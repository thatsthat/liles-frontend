import styles from "../styles/Temporada.module.css";
import apiCall from "../utils/apiFunctions";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import Icon from "@mdi/react";
import { mdiUndo } from "@mdi/js";

import ActuacioResum from "./ActuacioResum";

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
};

type Temporada = undefined | { actuacions: Actuacio[]; year: number };

function Temporada() {
  const id = useParams().temporadaId;
  const [temporada, setTemporada] = useState<Temporada>();

  const fetchActuacions = async (id: string) => {
    const dadesTemporada: Temporada = await apiCall("get", "/temporada/" + id);
    setTemporada(dadesTemporada);
  };

  useEffect(() => {
    if (id) fetchActuacions(id);
  }, [id]);

  return (
    temporada && (
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.title}>Temporada {temporada.year}</div>

          <Link to={"/"} className={styles.backButton}>
            <Icon className={styles.icon} path={mdiUndo} size={1} />
            Tornar
          </Link>
        </div>
        {temporada.actuacions.map((a, i) => (
          <Link className={styles.link} to={"/actuacio/" + a.id} key={i}>
            <ActuacioResum actuacio={a} />
          </Link>
        ))}
      </div>
    )
  );
}

export default Temporada;
