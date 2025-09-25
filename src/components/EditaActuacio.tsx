import {
  dataBackToFront,
  dataHoraBackToFront,
  dataHoraFrontToBack,
  type Temps,
} from "../utils/dateFormats";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import Select from "react-select";
import styles from "../styles/EditaActuacio.module.css";
import apiCall from "../utils/apiFunctions";
import { type ActuacioT } from "./types";

const colorScheme = {
  primary: "#719ECE",
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

type CityFrontend = {
  value: number;
  label: string;
};

type CityBackend = {
  id: number;
  nom: string;
};

const EditaActuacio = () => {
  const navigate = useNavigate();
  const actuacio: ActuacioT = useLocation().state;
  //console.log(dades);
  //const [errors, setErrors] = useState({});
  const [ciutats, setCiutats] = useState<CityFrontend[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityFrontend>({
    value: actuacio.ciutat.id,
    label: actuacio.ciutat.nom,
  });
  if (actuacio.dataHora) {
    var temps: Temps = dataHoraBackToFront(actuacio.dataHora);
  } else {
    const data = dataBackToFront(actuacio.data);
    var temps: Temps = {
      data: data,
      hora: undefined,
    };
  }
  const upload = async (formData: FormData) => {
    console.log(JSON.stringify(Object.fromEntries(formData.entries())));

    formData.set("ciutatId", selectedCity.value.toString());
    if (formData.get("hora"))
      formData.set(
        "hora",
        dataHoraFrontToBack(
          formData.get("data")!.toString(),
          formData.get("hora")!.toString()
        )
      );

    const resp = await apiCall(
      "PATCH",
      "/actuacio/" + actuacio.id,
      JSON.stringify(Object.fromEntries(formData.entries()))
    );
    console.log(JSON.stringify(Object.fromEntries(formData.entries())));
    navigate("/actuacio/" + actuacio.id);
    console.log(resp);
  };

  const fetchCities = async () => {
    const cities: CityBackend[] = await apiCall("get", "/ciutat");
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
                defaultValue={actuacio.nom}
              />
              <label>Data:</label>
              <input type="date" name="data" defaultValue={temps.data} />
              <label>Hora:</label>
              <input type="time" name="hora" defaultValue={temps.hora} />
              <label>Ciutat:</label>
              <div className={styles.citySearch}>
                <Select
                  defaultValue={selectedCity}
                  onChange={setSelectedCity as any}
                  options={ciutats}
                  isClearable={true}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: { ...theme.colors, ...colorScheme },
                  })}
                />
              </div>
              <label>Adreça:</label>
              <input
                placeholder="..."
                type="text"
                name="lloc"
                defaultValue={actuacio.lloc!}
              />
              <div className={styles.buttonRow}>
                <button type="submit" className={styles.button}>
                  Desar
                </button>
                <Link to={"/actuacio/" + actuacio.id} className={styles.button}>
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
