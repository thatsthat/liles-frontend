import styles from "../styles/Actuacio.module.css";
import { useState, useEffect } from "react";
import apiCall from "../utils/apiFunctions";
import { useParams, Link } from "react-router";
import Icon from "@mdi/react";
import { mdiUndo, mdiCalendar, mdiMapMarker } from "@mdi/js";
import DetallsActuacio from "./DetallsActuacio";
import ResultatsColla from "./ResultatsColla";

type Colla = {
  nom: string;
  id: number;
};

type TipusCastell = { nomCurt: string; nomLlarg: string };

type Castell = {
  nom: string;
  resultat: string;
  id: number;
  actuacioId: number;
  collaId: number;
  tipusId: number;
  tipusCastell: TipusCastell;
};

type Ciutat = {
  nom: string;
  coords: null;
  id: number;
};

type Actuacio = {
  id: number;
  data: string;
  nom: string;
  dataHora: Date | null;
  ciutat: Ciutat;
  ciutatLloc: string | null;
  castells: Castell[];
  temporadaId: number;
  colles: Colla[];
};

function Actuacio() {
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
        <div className={styles.header}>
          <div className={styles.nomDiada}>{actuacio.nom}</div>
          <Link
            to={"/temporada/" + actuacio.temporadaId}
            className={styles.backButton}
          >
            <Icon className={styles.icon} path={mdiUndo} size={1} />
            Tornar
          </Link>
        </div>
        <div className={styles.contingut}>
          <DetallsActuacio actuacio={actuacio} />
          <div className={styles.resultats}>
            {actuacio.colles.map((colla) => (
              <div className={styles.resultatsColla} key={colla.id}>
                <ResultatsColla
                  nomColla={colla.nom}
                  castells={actuacio.castells.filter(
                    (castell) => castell.collaId === colla.id
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default Actuacio;
