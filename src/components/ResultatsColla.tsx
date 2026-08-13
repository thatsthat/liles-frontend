import styles from "../styles/ResultatsColla.module.css";
import Skeleton from "react-loading-skeleton";

const SKELETON_CASTELLS_COUNT = 5;

type Castell = {
  nom: string;
  resultat: string;
  id: number;
  actuacioId: number;
  collaId: number;
  tipusId: number;
  tipusCastell: { nomCurt: string; nomLlarg: string };
};

type PropsType = {
  nomColla: string;
  castells: Castell[];
};

function ResultatsColla({ nomColla, castells }: PropsType) {
  return (
    <div className={styles.main}>
      <div className={styles.nomColla}>{nomColla + ": "} </div>
      <div className={styles.resultsList}>
        {castells.map((castell, i) => {
          let suffix = "";
          let comma = "";
          if (castell.resultat === "Intent") suffix = "(i)";
          else if (castell.resultat === "Intent desmuntat") suffix = "(id)";
          if (castell.resultat === "Carregat") suffix = "(c)";
          if (i < castells.length - 1) comma = ", ";
          return (
            <div key={i}>{castell.tipusCastell.nomCurt + suffix + comma}</div>
          );
        })}
      </div>
    </div>
  );
}

export function ResultatsCollaSkeleton() {
  return (
    <div className={styles.main}>
      <div className={styles.nomColla}>
        <Skeleton width={100} />
      </div>
      <div className={styles.resultsList}>
        {Array.from({ length: SKELETON_CASTELLS_COUNT }).map((_, i) => (
          <div key={i}>
            <Skeleton width={50} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultatsColla;
