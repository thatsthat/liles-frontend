import styles from "../styles/Temporada.module.css";
import apiCall from "../utils/apiFunctions";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";

type Castell = { nom: string; resultat: string };

type Actuacions =
  | undefined
  | {
      id: number;
      data: string;
      nom: string;
      dataHora: Date | null;
      ciutat: string;
      ciutatLloc: string | null;
      Castells: Castell[];
    }[];

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
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>Temporada {year}</div>
        <div className={styles.backButton}>
          <Link to={"/"}>Tornar</Link>
        </div>
      </div>
      {actuacions &&
        actuacions.map((a, i) => (
          <div className={styles.actuacio} key={i}>
            <div>
              {new Intl.DateTimeFormat("en-GB").format(new Date(a.data))}
            </div>
            <div className={styles.nomDiada}>{a.nom}</div>
            <div>{a.ciutat}</div>
          </div>
        ))}
    </div>
  );
}

export default Temporada;
