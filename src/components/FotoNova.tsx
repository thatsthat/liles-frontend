import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate, useParams } from "react-router";
import styles from "../styles/FotoNova.module.css";
import { loggedIn, userLogOut } from "../utils/userInfo";
import { apiFormCall } from "../utils/apiFunctions";

const FotoNova = () => {
  const [errors, setErrors] = useState({});
  const actuacioId = useParams().actuacioId;
  const navigate = useNavigate();
  const [reRender, trigger] = useOutletContext();
  const upload = async (event) => {
    event.preventDefault();
    let validationErrors = {};
    const fileNode = document.querySelector("input[type='file']");
    if (fileNode.files.length == 0) {
      validationErrors.file = "No hi ha cap foto seleccionada";
      setErrors(validationErrors);
      return;
    }
    const formData = new FormData(event.currentTarget);
    formData.append("collaId", 17);
    formData.append("actuacioId", actuacioId);
    const resp = await apiFormCall("/foto", formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle the successful form submission, e.g., sending formData to a server
      setErrors({}); // Clear any previous errors
      // triger render of actuacio component
      //reRender();
      // go back to actuacio
      navigate("/actuacio/" + actuacioId);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>Foto Nova</div>
      </div>
      <div className={styles.body}>
        <form id="fileForm" onSubmit={upload} encType="multipart/form-data">
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={() => setErrors({})}
            multiple
          />
          <button type="submit" className={styles.button}>
            Puja
          </button>
          {errors.file && <div className={styles.error}>{errors.file}</div>}
        </form>
      </div>
    </div>
  );
};

export default FotoNova;
