import React, { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";

const Api = "https://city-farms-db.onrender.com";

function Sessions() {
  const [session, setSession] = useState([]);

  useEffect(() => {
    fetch(Api)
      .then((res) => res.json())
      .then((data) => {
        setSession(data);
      })
      .catch((error) => console.error("error"));
  }, []);

  return (
    <div>
      <Typography variant="h5"  gutterBottom>
        Sessions
      </Typography>
      <div className="session">
        {session.map((s) => {
          return (
            <li key={s.ses_id}>
              <div className="card">
                <p>Date :{s.date}</p>
                <button className={s.status}>{s.status} </button>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
}
export default Sessions;
