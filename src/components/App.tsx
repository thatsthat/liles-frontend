import styles from "../styles/App.module.css";
import LlistaTemporades from "./LlistaTemporades";
import Temporada from "./Temporada";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LlistaTemporades />} />
        <Route path=":season?" element={<Temporada />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
