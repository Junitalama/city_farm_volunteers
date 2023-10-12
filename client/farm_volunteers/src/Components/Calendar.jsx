import { useState } from "react";
import Calendar from "react-calendar";

function CalendarData() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="volunteer">
      <h1 className="header">Hello Volunteers, please book your slot here</h1>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>
      <div className="text-center">Selected date: {date.toDateString()}</div>
    </div>
  );
}

export default CalendarData;
