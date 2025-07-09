import Galeria from "./Galeria";
import Actuacio from "./Actuacio";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Galeria />} />
        <Route path="/temporada/:temporadaId?" element={<Galeria />} />
        <Route path="/actuacio/:actuacioId" element={<Actuacio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
