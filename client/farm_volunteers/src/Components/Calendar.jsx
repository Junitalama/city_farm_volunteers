import { useState } from "react";
import Calendar from "react-calendar";
import Slots from "./Slots";


function CalendarData() {
  const [date, setDate] = useState(new Date());
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="app">
      <h1 className="header">React Calendar</h1>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>
      <div className="text-center">
        <Slots SelectedDate = {formatDate(date)} /></div>
    </div>
  );
}

export default CalendarData;
