import Sessions from "./Components/Sessions";
import "./App.css";
import Search from "./Components/Search";
import AddSlot from "./Components/AddSlot";

import { useState } from "react";
import Calendar from "react-calendar";

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="app">
      <h1 className="header">City-Farm</h1>
      <h2>Hello volunteers, please book your slot here!!!</h2>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>
      <div className="text-center">Selected date: {date.toDateString()}</div>
      <Sessions />
      <Search />
      <AddSlot />
    </div>
  );
}

export default App;
