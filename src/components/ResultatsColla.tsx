import styles from "../styles/ResultatsColla.module.css";
import { Link } from "react-router";

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
      <div className={styles.nomColla}>{nomColla}</div>
      {castells.map((castell) => (
        <div className={styles.castell} key={castell.id}>
          {castell.tipusCastell.nomCurt}
          {": " + castell.resultat}
        </div>
      ))}
    </div>
  );
}

export default ResultatsColla;
