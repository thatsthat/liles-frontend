import styles from "../styles/Temporada.module.css";
import apiCall from "../utils/apiFunctions";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import TarjetaActuacio from "./TarjetaActuacio";

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

type Actuacions = undefined | Actuacio[];

function Temporada() {
  const year = useParams().season;
  const [actuacions, setActuacions] = useState<Actuacions>();

  const fetchActuacions = async (year: string) => {
    const dadesActuacions: Actuacions = await apiCall(
      "get",
      "/private/actuacions-temporada/" + year
    );
    setActuacions(dadesActuacions);
  };

  useEffect(() => {
    if (year) fetchActuacions(year);
  }, [year]);

  return (
    actuacions && (
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.title}>Temporada {year}</div>
          <div className={styles.backButton}>
            <Link to={"/"}>Tornar</Link>
          </div>
        </div>
        {actuacions.map((a) => (
          <TarjetaActuacio actuacio={a} />
        ))}
      </div>
    )
  );
}

export default Temporada;
