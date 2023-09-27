import React, { useState, useEffect } from "react";

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
      <h3>see all our available, cancelled or booked sessions here:</h3>
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
  );
}
export default Sessions;
