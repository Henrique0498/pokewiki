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
import Items from "./Pages/Items/Items";
import Moves from "./Pages/Moves/Moves";
import About from "./Pages/About/About";
import NotFound from "./Helper/NotFound/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/abilities/*" element={<Abilities />} />
              <Route path="/berry/*" element={<Berry />} />
              <Route path="/items/*" element={<Items />} />
              <Route path="/moves/*" element={<Moves />} />
              <Route path="/pokemon/:id" element={<Pokemon />} />
              <Route path="/sobre/*" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </>
  );
}

export default App;
