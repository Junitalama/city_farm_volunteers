import React, { useState, useEffect } from "react";

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

  return (
    <div>
      <h4>Volunteers' profile</h4>
      <div className="volunteers" id="profile">
        {volunteers.map((s) => {
          return (
            <li key={s.ses_id}>
              <div className="card_2">
                <p>Name :{s.name}</p>
                <p>Email :{s.email}</p>
                <p>Phone :{s.phone}</p>
                <p>Date:{s.date}</p>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
}
export default Volunteers;
