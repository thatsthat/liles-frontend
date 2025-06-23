import styles from "../styles/TarjetaActuacio.module.css";
//import { useParams, Link } from "react-router";
import Icon from "@mdi/react";
import { mdiCalendar, mdiMapMarker } from "@mdi/js";

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

type ActuacioProps = {
  actuacio: Actuacio;
};

function TarjetaActuacio({ actuacio }: ActuacioProps) {
  return (
    <div className={styles.main}>
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
  );
}

export default TarjetaActuacio;
