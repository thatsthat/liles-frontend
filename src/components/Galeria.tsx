import styles from "../styles/Galeria.module.css";
import apiCall from "../utils/apiFunctions";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import Icon from "@mdi/react";
import { mdiDeathlyHallows, mdiUndo } from "@mdi/js";
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

function Galeria() {
  const id = useParams().temporadaId;
  const [data, setData] = useState<dataType>();
  const imgPath = escut;

  const title = id ? "Temporada " + data.year : "Temporades";

  const fetchData = async (id: string) => {
    const dades = await apiCall("get", "/temporada/" + id);
    setData(dades);
  };

  useEffect(() => {
    if (id) fetchData(id);
    else fetchData("");
  }, [id]);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        {id && (
          <Link to={"/"} className={styles.backButton}>
            <Icon className={styles.icon} path={mdiUndo} size={1} />
            Tornar
          </Link>
        )}
      </div>
      <div className={styles.content}>
        {id
          ? data.actuacions &&
            data.actuacions.map((actuacio: Actuacio, i: number) => (
              <TargetaGaleria
                imagePath={imgPath}
                url={"/actuacio/" + actuacio.id}
                titol={actuacio.nom}
                subTitol={""}
                key={i}
              />
            ))
          : Array.isArray(data) &&
            data.map((temporada: Temporada, i: number) => (
              <TargetaGaleria
                imagePath={imgPath}
                url={"/temporada/" + temporada.id}
                titol={"Temporada " + temporada.year}
                subTitol={""}
                key={i}
              />
            ))}
      </div>
    </div>
  );
}

export default Galeria;
