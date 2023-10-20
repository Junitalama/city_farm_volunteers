import React, { useState, useEffect } from "react";
import CalendarData from "./Calendar";

const Api = "https://city-farms-db.onrender.com/booking";

function BookSession() {
  const [session, setSession] = useState([]);

  useEffect(() => {
    fetch(Api)
      .then((res) => res.json())
      .then((data) => {
        setSession(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  return (
    <div>
      <CalendarData />

      <div className="session">
        {session.map((s) => (
          <li key={s.booking_id}>
            <div className="card">
              <p>{s.name}</p>

              <p> {s.email}</p>
              <p> {s.phone}</p>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default BookSession;
