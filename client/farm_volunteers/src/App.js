import React from "react";
import "./App.css";
import Volunteers from "./Components/Volunteers";
import ImgMediaCard from "./Components/Card";
import Header from "./Components/Header";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import CustomizedMenus from "./Components/ViewOption";
import { Switch, Route } from "react-router-dom";
import BookSession from "./Components/BookSession";



const Main = () => (
  <Switch>
    <Route exact path="/" component={ImgMediaCard}></Route>
    <Route exact path="/manager" component={Volunteers}></Route>
    <Route exact path="/volunteer" component={BookSession}></Route>
  </Switch>
);

function App() {
  return (
    <div className="app">
      <Header />
      <CustomizedMenus />
      <Main />
      
      

      <Contact />

      <Footer />
    </div>
  );
}

export default App;
