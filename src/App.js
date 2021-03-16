import React from "react";
import "./Assets/Css/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserStorage } from "./UseContext";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Pokemon from "./Pages/Pokemon/Pokemon/Pokemon";
import Berry from "./Pages/Berry/Berry";
import Abilities from "./Pages/Abilities/Abilities";
import Item from "./Pages/Item/Item";
import Move from "./Pages/Move/Move";
import About from "./Pages/About/About";
import NotFound from "./Helper/NotFound/NotFound";
import Background from "./Components/Background/Background";

function App() {
  const reference = React.useRef();

  return (
    <>
      <BrowserRouter>
        <UserStorage>
          <Background reference={reference} />
          <Header />
          <main className="main" ref={reference}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/abilities/*" element={<Abilities />} />
              <Route path="/berry/*" element={<Berry />} />
              <Route path="/item/*" element={<Item />} />
              <Route path="/move/*" element={<Move />} />
              <Route path="/pokemon/:id" element={<Pokemon />} />
              <Route path="/sobre/*" element={<About />} />
              <Route
                path="*"
                element={
                  <NotFound text="Não foi possível encontrar esta página." />
                }
              />
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </>
  );
}

export default App;
