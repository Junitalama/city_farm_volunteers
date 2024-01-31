import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import BookSession from "./Components/BookSession";
import Contact from "./Components/Contact";
import CustomizedMenus from "./Components/ViewOption";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ImgMediaCard from "./Components/Card";
import Volunteers from "./Components/Volunteers";

const Main = () => (
  <Switch>
    <Route exact path="/" component={ImgMediaCard} />
    <Route exact path="/manager" component={Volunteers} />
    <Route exact path="/volunteer" component={BookSession} />
  </Switch>
);

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <CustomizedMenus />
        <Main />
        <Contact />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
