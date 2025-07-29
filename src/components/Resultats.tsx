import styles from "../styles/Resultats.module.css";
import ResultatsColla from "./ResultatsColla";

type Colla = {
  nom: string;
  id: number;
};

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
  colles: Colla[];
  castells: Castell[];
};

function Resultats({ colles, castells }: PropsType) {
  return (
    <div className={styles.main}>
      {colles.map((colla) => (
        <div className={styles.resultatsColla} key={colla.id}>
          <ResultatsColla
            nomColla={colla.nom}
            castells={castells.filter(
              (castell) => castell.collaId === colla.id
            )}
          />
        </div>
      ))}
    </div>
  );
}

export default Resultats;
