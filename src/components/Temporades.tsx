import styles from "../styles/Temporades.module.css";
import apiCall from "../utils/apiFunctions";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { loggedIn } from "../utils/userInfo";
import Icon from "@mdi/react";
import { mdiUndo } from "@mdi/js";
import escut from "../assets/escut.png";

import TargetaGaleria from "./TargetaGaleria";

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

type Temporada = { actuacions: Actuacio[]; year: number; id: number };

type dataType = Actuacio[] | Temporada;

function Temporades() {
  const id = useParams().temporadaId;
  const [data, setData] = useState<dataType>();
  const imgPath = escut;

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
              data.map((temporada: Temporada, i: number) => (
                <Link to={"/temporada/" + temporada.id}>{temporada.year}</Link>
              ))}
          </div>
        </div>
      </div>
    )
  );
}

export default Temporades;
