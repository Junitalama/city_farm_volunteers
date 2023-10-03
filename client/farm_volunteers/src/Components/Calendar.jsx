import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


function CalendarData() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="app">
      <h1 className="text-center">choose a date</h1>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className="text-center">
        <span className="bold">Selected Date:</span> {date.toDateString()}
      </p>
    </div>
  );
}

export default CalendarData;
