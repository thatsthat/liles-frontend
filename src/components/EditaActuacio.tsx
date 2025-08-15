import {
  dataBackToFront,
  dataHoraBackToFront,
  dataHoraFrontToBack,
} from "../utils/dateFormats";
import React, { useState, useEffect } from "react";
import {
  useOutletContext,
  useNavigate,
  useParams,
  useLocation,
  Link,
} from "react-router";
import Select from "react-select";
import styles from "../styles/EditaActuacio.module.css";
import { loggedIn, userLogOut } from "../utils/userInfo";
import apiCall from "../utils/apiFunctions";

const colorScheme = {
  primary: "black",
  primary: "grey",
  primary75: "black",
  primary50: "black",
  primary25: "black",
  danger: "black",
  dangerLight: "black",
  neutral0: "#2b2a33",
  neutral5: "black",
  neutral10: "black",
  neutral20: "#8f8f9d",
  neutral30: "black",
  neutral40: "black",
  neutral50: "white",
  neutral60: "black",
  neutral70: "black",
  neutral80: "white",
  neutral90: "black",
};

const EditaActuacio = () => {
  const navigate = useNavigate();
  const dades = useLocation().state;
  //console.log(dades);
  const [errors, setErrors] = useState({});
  const [ciutats, setCiutats] = useState(null);
  const [selectedCity, setSelectedCity] = useState({
    value: dades.ciutat.id,
    label: dades.ciutat.nom,
  });
  if (dades.dataHora) {
    var temps = dataHoraBackToFront(dades.dataHora);
  } else {
    const data = dataBackToFront(dades.data);
    var temps = { data: data, hora: undefined };
  }
  const upload = async (formData) => {
    console.log(JSON.stringify(Object.fromEntries(formData.entries())));

    formData.set("ciutatId", selectedCity.value);
    if (formData.get("hora").length > 0)
      formData.set(
        "hora",
        dataHoraFrontToBack(formData.get("data"), formData.get("hora"))
      );

    const resp = await apiCall(
      "PATCH",
      "/actuacio/" + dades.id,
      JSON.stringify(Object.fromEntries(formData.entries()))
    );
    console.log(JSON.stringify(Object.fromEntries(formData.entries())));
    navigate("/actuacio/" + dades.id);
  };

  const fetchCities = async () => {
    const cities = await apiCall("get", "/ciutat");
    const cities2 = cities.map((city) => {
      return { value: city.id, label: city.nom };
    });
    setCiutats(cities2);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    ciutats && (
      <>
        <div className={styles.main}>
          <div className={styles.form}>
            <form action={upload}>
              <label>Títol:</label>
              <input
                placeholder="Títol"
                type="text"
                name="nom"
                defaultValue={dades.nom}
              />
              <label>Data:</label>
              <input type="date" name="data" defaultValue={temps.data} />
              <label>Hora:</label>
              <input type="time" name="hora" defaultValue={temps.hora} />
              <label>Ciutat:</label>
              <Select
                defaultValue={selectedCity}
                onChange={setSelectedCity}
                options={ciutats}
                isClearable={true}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: { ...theme.colors, ...colorScheme },
                })}
              />
              <label>Adreça:</label>
              <input
                placeholder="..."
                type="text"
                name="lloc"
                defaultValue={dades.lloc}
              />
              <div className={styles.buttonRow}>
                <button type="submit" className={styles.button}>
                  Desar
                </button>
                <Link to={"/actuacio/" + dades.id} className={styles.button}>
                  Cancel·lar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  );
};

export default EditaActuacio;
