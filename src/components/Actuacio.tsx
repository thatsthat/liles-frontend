import styles from "../styles/Actuacio.module.css";
import { useState, useEffect } from "react";
import apiCall from "../utils/apiFunctions";
import { useParams, Link } from "react-router";
import DetallsActuacio, { DetallsActuacioSkeleton } from "./DetallsActuacio";
import Resultats, { ResultatsSkeleton } from "./Resultats";
import Header, { HeaderSkeleton } from "./Header";
import Fotos from "./Fotos";
import { type ActuacioT, type Colla } from "./types";
import { loggedIn } from "../utils/userInfo";

function Actuacio() {
  const id: string | undefined = useParams().actuacioId;
  const [actuacio, setActuacio] = useState<ActuacioT>();
  const [loading, setLoading] = useState(true);
  //const [reRender, trigger] = useOutletContext();

  useEffect(() => {
    if (!id) return;
    apiCall("get", "/actuacio/" + id)
      .then((dadesActuacio: ActuacioT) => {
        // Posa Cornellà primer a l'array de colles
        const cornella: Array<Colla> = dadesActuacio.colles.filter(
          (colla: Colla) => colla.id === 17
        );
        const altresColles: Array<Colla> = dadesActuacio.colles.filter(
          (colla: Colla) => colla.id !== 17
        );
        dadesActuacio.colles2 = [...cornella, ...altresColles];
        setActuacio(dadesActuacio);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    (loading || actuacio) && (
      <div className={`${styles.main} ${loggedIn() ? styles.placeHolder : {}}`}>
        {loading ? (
          <>
            <HeaderSkeleton />
            <DetallsActuacioSkeleton />
            <ResultatsSkeleton />
          </>
        ) : (
          actuacio && (
            <>
              <Header nom={actuacio.nom} temporadaId={actuacio.temporadaId} />
              <DetallsActuacio actuacio={actuacio} />
              <Resultats
                castells={actuacio.castells}
                colles={actuacio.colles2}
              />
              {loggedIn() && (
                <div className={styles.buttons}>
                  <Link
                    to={"/fotoNova"}
                    state={actuacio}
                    className={styles.button}
                  >
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
            </>
          )
        )}
      </div>
    )
  );
}

export default Actuacio;
