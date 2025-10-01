import styles from "../styles/Fotos.module.css";
import { type Foto } from "./types";

type PropsType = {
  fotos: Foto[];
};

function Fotos({ fotos }: PropsType) {
  return (
    <div className={styles.main}>
      {fotos.map((foto, i) => (
        <img
          src={import.meta.env.PROD ? "media/" + foto.nom : foto.url}
          key={i}
          alt="Image"
        />
      ))}
    </div>
  );
}

export default Fotos;
