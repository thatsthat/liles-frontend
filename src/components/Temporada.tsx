import styles from "../styles/Temporada.module.css";
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

function Temporada() {
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
          <div className={styles.title}>{"Temporada " + data.year}</div>
          {
            <Link to={"/"} className={styles.backButton}>
              <Icon className={styles.icon} path={mdiUndo} size={1} />
              Tornar
            </Link>
          }
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            {data.actuacions &&
              data.actuacions.map((actuacio: Actuacio, i: number) => (
                <TargetaGaleria
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
