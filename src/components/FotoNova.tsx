import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import styles from "../styles/FotoNova.module.css";
import { type ActuacioT } from "./types";
import { apiFormCall } from "../utils/apiFunctions";

type FileErrors = {
  file: string;
};

const FotoNova = () => {
  const [errors, setErrors] = useState<FileErrors>({ file: "" });
  const [uploadCount, setUploadCount] = useState<number>(0);
  const [numFiles, setNumFiles] = useState<number>(0);

  const actuacio: ActuacioT = useLocation().state;
  const castells = actuacio.castells.filter(
    (castell) => castell.collaId === 17
  );
  const navigate = useNavigate();
  //const [reRender, trigger] = useOutletContext();
  const upload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let validationErrors: FileErrors = { file: "" };
    const fileNode: HTMLInputElement | null =
      document.querySelector("input[type='file']");
    setNumFiles(fileNode!.files!.length);
    if (fileNode!.files!.length == 0) {
      validationErrors.file = "No hi ha cap foto seleccionada";
      setErrors(validationErrors);
      return;
    }
    if (event.currentTarget instanceof HTMLFormElement) {
      for (const file of fileNode!.files!) {
        const formData = new FormData();
        formData.append("avatar", file);
        formData.append("collaId", "17");
        formData.append("castellId", "");
        formData.append("actuacioId", actuacio.id.toString());
        await apiFormCall("/foto", formData); // TODO Check for errors in API call
        setUploadCount((x) => x + 1);
      }
    }
    if (validationErrors.file.length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({ file: "" });
      navigate("/actuacio/" + actuacio.id);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>Foto Nova</div>
      </div>
      <div className={styles.body}>
        <form
          id="fileForm"
          className={styles.form}
          onSubmit={upload}
          encType="multipart/form-data"
        >
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={() => setErrors({ file: "" })}
            multiple
          />
          <div className={styles.castellPicker}>
            <label>Castell:</label>
            <select id="castell" name="castellId" form="fileForm">
              <option value="">Cap castell</option>
              {castells.map((castell) => (
                <option value={castell.id}>
                  {castell.tipusCastell.nomCurt}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={styles.button}>
            Puja
          </button>
          {!!errors.file.length && (
            <div className={styles.error}>{errors.file}</div>
          )}
          {!!uploadCount && (
            <div className={styles.counter}>
              {uploadCount} out of {numFiles} files uploaded
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FotoNova;
