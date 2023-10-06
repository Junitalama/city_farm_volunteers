import React from "react";
import "./App.css";
import CalendarData from "./Components/Calendar";
import PositionedMenu from "./Components/Menu";
import Volunteers from "./Components/Volunteers";
import ImgMediaCard from "./Components/Card";
import Header from "./Components/Header";
import Sessions from "./Components/ShowBookedSession";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";


function App() {
  return (
    <div className="app">
      <Header />
      <PositionedMenu />
      <ImgMediaCard />
      <CalendarData />
      <Volunteers />
      <Sessions />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
