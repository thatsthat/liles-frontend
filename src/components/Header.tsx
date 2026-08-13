import styles from "../styles/Header.module.css";
import { Link } from "react-router";
import Icon from "@mdi/react";
import { mdiUndo } from "@mdi/js";
import Skeleton from "react-loading-skeleton";

type PropsType = {
  nom: string;
  temporadaId: number;
};

function Header({ nom, temporadaId }: PropsType) {
  return (
    <div className={styles.main}>
      <div className={styles.nomDiada}>{nom}</div>
      <Link to={"/temporada/" + temporadaId} className={styles.backButton}>
        <Icon className={styles.icon} path={mdiUndo} size={1} />
        Tornar
      </Link>
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div className={styles.main}>
      <div className={styles.nomDiada}>
        <Skeleton width="70%" />
      </div>
      <div className={styles.backButton}>
        <Icon className={styles.icon} path={mdiUndo} size={1} />
        Tornar
      </div>
    </div>
  );
}

export default Header;
