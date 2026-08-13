import Timeline from "./Timeline";
import Temporada from "./Temporada";
import Actuacio from "./Actuacio";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NavBar from "./NavBar";
import FotoNova from "./FotoNova";
import EditaActuacio from "./EditaActuacio";

import { BrowserRouter, Routes, Route } from "react-router";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <SkeletonTheme baseColor="#3a3a3a" highlightColor="#4d4d4d">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="/" element={<Timeline />} />
            <Route path="/temporada/:temporadaId?" element={<Temporada />} />
            <Route path="/actuacio/:actuacioId" element={<Actuacio />} />
            <Route path="/fotoNova" element={<FotoNova />} />
            <Route path="/editaActuacio" element={<EditaActuacio />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  );
}

export default App;
