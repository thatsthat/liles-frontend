import React, { useState, useEffect } from "react";
import {
  useOutletContext,
  useNavigate,
  useParams,
  useLocation,
} from "react-router";
import styles from "../styles/EditaActuacio.module.css";
import { loggedIn, userLogOut } from "../utils/userInfo";
import { apiFormCall } from "../utils/apiFunctions";

const EditaActuacio = () => {
  const dades = useLocation().state;
  console.log(dades);
  const upload = async (event) => {
    event.preventDefault();
    let validationErrors = {};
    setErrors(validationErrors);
    const formData = new FormData(event.currentTarget);
    formData.append("iep", 17);
    const resp = await apiFormCall("/foto", formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      navigate("/actuacio/" + actuacioId);
    }
  };

  return (
    <>
      <div>
        <div className={styles.form}>
          <form onSubmit={upload}>
            <label>Títol:</label>
            <input
              placeholder="Títol"
              type="text"
              name="titol"
              defaultValue={dades.nom}
            />
            <label>Data:</label>
            <input
              type="date"
              name="data"
              defaultValue={new Date(dades.data)}
            />
            <label>Hora:</label>
            <input type="date" name="hora" defaultValue={dades.dataHora} />
            <label>Ciutat:</label>
            <input
              placeholder="..."
              type="text"
              name="ciutat"
              defaultValue={dades.ciutat.nom}
            />
            <label>Adreça:</label>
            <input
              placeholder="..."
              type="text"
              name="adreca"
              defaultValue={dades.lloc}
            />
            <button type="submit" className={styles.button}>
              Desar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditaActuacio;
