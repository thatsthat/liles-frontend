import styles from "../styles/Fotos.module.css";
import { Link } from "react-router";

type Foto = {
  url: string;
};

type PropsType = {
  fotos: Foto[];
};

function Fotos({ fotos }: PropsType) {
  return (
    <div className={styles.main}>
      {fotos.map((foto, i) => (
        <img src={foto.url} key={i} alt="Image" />
      ))}
    </div>
  );
}

export default Fotos;
