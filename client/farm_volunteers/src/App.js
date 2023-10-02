import Sessions from "./Components/Sessions";
import "./App.css";
import PositionedMenu from "./Components/Menu";
import Volunteers from "./Components/Volunteers";
import ImgMediaCard from "./Components/Card";
import Header from "./Components/Header";
import React from "react";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <PositionedMenu />
      <ImgMediaCard />
      <Sessions />
      <Volunteers />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
