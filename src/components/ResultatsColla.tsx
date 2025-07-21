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
      <div className={styles.nomColla}>{nomColla + ": "} </div>
      {castells.map((castell, i) => {
        let suffix = "";
        let prefix = "";
        if (castell.resultat === "Intent") suffix = "(i)";
        else if (castell.resultat === "Intent desmuntat") suffix = "(id)";
        if (castell.resultat === "Carregat") suffix = "(c)";
        if (i > 0) prefix = ", ";
        return <>{prefix + castell.tipusCastell.nomCurt + suffix}</>;
      })}
    </div>
  );
}

export default ResultatsColla;
