import React, { useState, useEffect } from "react";
import Form from "./Form";

const Api = "https://city-farms-db.onrender.com/volunteers";

function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetch(Api)
      .then((res) => res.json())
      .then((data) => {
        setVolunteers(data);
      })
      .catch((error) => console.error("error"));
  }, []);
  const handleAdd = (newVolunteer) => {
    fetch(Api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVolunteer),
    })
      .then((response) => response.json())
      .then((data) => {
        setVolunteers((v) => [
          ...v,
          { ...newVolunteer, id: data.vol_id, rating: 0 },
        ]);
      })
      .catch((error) => console.error("Error adding video:", error));
  };

  return (
    <div>
      <Form onAdd={handleAdd} />
      <h2>volunteers profile</h2>
      {volunteers.map((s) => {
        return (
          <li key={s.ses_id}>
            <div className="card_2">
              <p>Name :{s.name}</p>
              <p>Email :{s.email}</p>
              <p>Phone :{s.phone}</p>
              <p>Slot :{s.slot}</p>
              <p>Date :{s.date}</p>
            </div>
          </li>
        );
      })}
    </div>
  );
}
export default Volunteers;
