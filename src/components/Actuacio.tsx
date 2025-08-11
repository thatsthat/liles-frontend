import styles from "../styles/Actuacio.module.css";
import { useState, useEffect } from "react";
import apiCall from "../utils/apiFunctions";
import { useParams, useNavigate, useOutletContext, Link } from "react-router";
import DetallsActuacio from "./DetallsActuacio";
import Resultats from "./Resultats";
import Header from "./Header";
import Fotos from "./Fotos";
import { loggedIn, userLogOut } from "../utils/userInfo";

type Foto = {
  url: string;
};

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
  lloc: string | null;
  castells: Castell[];
  temporadaId: number;
  colles: Colla[];
  colles2: Colla[];
  fotos: Foto[];
};

function Actuacio() {
  const id = useParams().actuacioId;
  const [actuacio, setActuacio] = useState<Actuacio>();
  const [reRender, trigger] = useOutletContext();

  const fetchActuacio = async (id: string) => {
    let dadesActuacio: Actuacio = await apiCall("get", "/actuacio/" + id);
    // Posa Cornellà primer a l'array de colles
    const cornella = dadesActuacio.colles.filter((colla) => colla.id === 17);
    const altresColles = dadesActuacio.colles.filter(
      (colla) => colla.id !== 17
    );
    dadesActuacio.colles2 = [...cornella, ...altresColles];
    setActuacio(dadesActuacio);
  };

  useEffect(() => {
    console.log("actuacio useEffect");
    if (id) fetchActuacio(id);
  }, [id]);

  return (
    actuacio && (
      <div className={`${styles.main} ${loggedIn() ? styles.placeHolder : {}}`}>
        <Header nom={actuacio.nom} temporadaId={actuacio.temporadaId} />
        <DetallsActuacio actuacio={actuacio} />
        <Resultats castells={actuacio.castells} colles={actuacio.colles2} />
        {loggedIn() && (
          <div className={styles.buttons}>
            <Link to={"/fotoNova/" + actuacio.id} className={styles.button}>
              Puja fotos
            </Link>
            <Link
              to={"/editaActuacio/"}
              state={actuacio}
              className={styles.button}
            >
              Modifica dades
            </Link>
          </div>
        )}
        <Fotos fotos={actuacio.fotos} />
      </div>
    )
  );
}

export default Actuacio;
