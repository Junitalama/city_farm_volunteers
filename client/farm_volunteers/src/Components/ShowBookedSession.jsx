import React, { useState } from "react";
import Typography from "@mui/material/Typography";

const Api = "https://city-farms-db.onrender.com/booking";

function Sessions() {
  const [session, setSession] = useState([]);
  const [booked, setBooked] = useState(false);

  const ShowBooked = () => {
    fetch(Api)
      .then((res) => res.json())
      .then((data) => {
        setSession(data);
        setBooked(true);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Sessions
      </Typography>
      <button className="btn btn-info" onClick={ShowBooked}>
        Show Booked Session
      </button>
      {booked && (
        <div className="session">
          {session.map((s) => (
            <li key={s.ses_id}>
              <div className="card">
                <p>{s.date}</p>
                <p>slot:{s.slot}</p>
                <p>
                  status: <button>{s.status}</button>
                </p>
                <p>Booked By: {s.name}</p>
                <p> {s.email}</p>
                <p> {s.phone}</p>
              </div>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sessions;
