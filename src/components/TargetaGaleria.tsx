import styles from "../styles/TargetaGaleria.module.css";
import { Link } from "react-router";

type PropsType = {
  url: string;
  titol: string;
  subTitol: string;
  imagePath: string;
};

function TargetaGaleria({ url, titol, subTitol, imagePath }: PropsType) {
  return (
    <div className={styles.main}>
      <Link to={url}>
        <div className={styles.imatge}>
          <img src={imagePath} />
        </div>
        <div className={styles.text}>
          <div className={styles.titol}>{titol}</div>
          <div className={styles.subTitol}>{subTitol}</div>
        </div>
      </Link>
    </div>
  );
}

export default TargetaGaleria;
