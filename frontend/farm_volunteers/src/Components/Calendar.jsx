import React, { useState } from "react";
import Calendar from "react-calendar";
import Sessions from "./SessionsInfo";

const CalendarData = ({ session }) => {
  const [date, setDate] = useState(new Date());

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h2>Book a Session</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div style={{ width: "60%" }}>
          <h3>Select a Date</h3>
          <Calendar onChange={setDate} value={date} />
        </div>

        <div style={{ width: "40%" }}>
          <h5>Sessions for {formatDate(date)}</h5>
          {/* Pass 'session' data to the Sessions component */}
          <Sessions selectedDate={formatDate(date)} session={session} />
        </div>
      </div>
    </div>
  );
};

export default CalendarData;
