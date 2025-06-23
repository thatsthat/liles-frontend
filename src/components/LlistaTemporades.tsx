import styles from "../styles/LlistaTemporades.module.css";
import apiCall from "../utils/apiFunctions";
import { useState, useEffect } from "react";
import { Link } from "react-router";
type Temporades = undefined | string[];

function LlistaTemporades() {
  const [temporades, setTemporades] = useState<Temporades>();

  const fetchTemporades = async () => {
    const dadesTemporades: Temporades = await apiCall(
      "get",
      "/private/llista-temporades/"
    );
    setTemporades(dadesTemporades);
  };

  useEffect(() => {
    fetchTemporades();
  }, []);

  return (
    temporades && (
      <div className={styles.main}>
        <div className={styles.header}>Temporades</div>
        {temporades.map((t, i) => (
          <div key={i}>
            <Link to={"/" + t} className={styles.temporada}>
              {t}
            </Link>
          </div>
        ))}
      </div>
    )
  );
}

export default LlistaTemporades;
