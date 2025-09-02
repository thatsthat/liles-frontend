import styles from "../styles/TargetaGaleria.module.css";
import { Link } from "react-router";
import Icon from "@mdi/react";
import { mdiCalendar, mdiCity } from "@mdi/js";

type PropsType = {
  url: string;
  titol: string;
  imagePath: string;
  data: string;
  ciutat: string;
  temporada: string;
};

function TargetaGaleria({
  url,
  titol = "",
  imagePath = "",
  data = "",
  ciutat = "",
  temporada = "",
}: PropsType) {
  return (
    <div className={styles.main}>
      <Link to={url}>
        {titol && <div className={styles.titol}>{titol}</div>}
        <div className={styles.detalls}>
          {data && (
            <div className={styles.detallsText}>
              <div>
                <Icon className={styles.icon} path={mdiCalendar} size={1} />
                {new Intl.DateTimeFormat("en-GB").format(new Date(data))}
              </div>
              <div>
                <Icon className={styles.icon} path={mdiCity} size={1} />
                {ciutat}
              </div>
            </div>
          )}
          <div className={styles.imatge}>
            {imagePath && <img src={imagePath} />}
          </div>
        </div>
        {temporada && <div className={styles.temporada}>{temporada}</div>}
      </Link>
    </div>
  );
}

export default TargetaGaleria;
