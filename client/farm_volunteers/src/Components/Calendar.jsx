import React, { useState } from "react";
import Calendar from "react-calendar";
import Sessions from "./SessionsInfo";

const CalendarData = () => {
  const [date, setDate] = useState(new Date());

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h3>
        Book 
      </h3>
      <div className="container calendar-container">
        <div className="row">
          <div className="col-lg-6">
            <div className="calendar">
              <Calendar onChange={setDate} value={date} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="sessions">
              <Sessions selectedDate={formatDate(date)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarData;
