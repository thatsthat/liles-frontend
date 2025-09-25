import styles from "../styles/DetallsActuacio.module.css";
import Icon from "@mdi/react";
import { mdiCalendar, mdiMapMarker, mdiCity, mdiClock } from "@mdi/js";
import { type ActuacioT } from "./types";

type PropsType = {
  actuacio: ActuacioT;
};

function DetallsActuacio({ actuacio }: PropsType) {
  return (
    <div className={styles.main}>
      <div className={styles.diaIlloc}>
        <div className={styles.temps}>
          <div>
            <Icon className={styles.icon} path={mdiCalendar} size={1} />
            {new Intl.DateTimeFormat("en-GB").format(new Date(actuacio.data))}
          </div>
          <div>
            {actuacio.dataHora && (
              <Icon className={styles.icon} path={mdiClock} size={1} />
            )}
            {actuacio.dataHora &&
              new Intl.DateTimeFormat("en-GB", {
                hour: "numeric",
                minute: "numeric",
                timeZone: "UTC",
              }).format(new Date(actuacio.dataHora))}
          </div>
        </div>
        <div className={styles.geo}>
          <div>
            <Icon className={styles.icon} path={mdiCity} size={1} />
            {actuacio.ciutat.nom}
          </div>
          <div>
            {actuacio.lloc && (
              <Icon className={styles.icon} path={mdiMapMarker} size={1} />
            )}
            {actuacio.lloc}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallsActuacio;
