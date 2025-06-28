import LlistaTemporades from "./LlistaTemporades";
import Temporada from "./Temporada";
import ActuacioDetalls from "./ActuacioDetalls";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LlistaTemporades />} />
        <Route path="/temporada/:temporadaId" element={<Temporada />} />
        <Route path="/actuacio/:actuacioId" element={<ActuacioDetalls />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
