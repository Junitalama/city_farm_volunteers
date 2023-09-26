import React, { useState, useEffect } from "react";
import Form from "./Form";
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

    const handleAdd = (newSession) => {
      fetch(Api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSession),
      })
        .then((response) => response.json())
        .then((data) => {
          setSession((s) => [
            ...s,
            { ...newSession, id: data.vol_id},
          ]);
        })
        .catch((error) => console.error("Error", error));
      };
  return (
    <div>
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
      <Form onAdd={handleAdd} />
    </div>
  );
}
export default Sessions;
