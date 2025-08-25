import Galeria from "./Galeria";
import Actuacio from "./Actuacio";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NavBar from "./NavBar";
import FotoNova from "./FotoNova";
import EditaActuacio from "./EditaActuacio";

import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<Galeria />} />
          <Route path="/temporada/:temporadaId?" element={<Galeria />} />
          <Route path="/actuacio/:actuacioId" element={<Actuacio />} />
          <Route path="/fotoNova" element={<FotoNova />} />
          <Route path="/editaActuacio" element={<EditaActuacio />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
