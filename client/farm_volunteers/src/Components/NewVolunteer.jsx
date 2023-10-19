import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import BookingForm from "./Form"; 


const Api = "https://city-farms-db.onrender.com/volunteers";

function NewVolunteer() {
  const [session, setSession] = useState([]);

  useEffect(() => {
    fetch(Api)
      .then((res) => res.json())
      .then((data) => {
        setSession(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleAdd = (newVolunteer) => {
    setSession((prevSession) => [...prevSession, newVolunteer]);
  };

  return (
    <div>
     
      <BookingForm onAdd={handleAdd} />
     
      <Typography variant="h5" gutterBottom>
        View or Cancel your booking here:
      </Typography>
      <ul className="session">
        {session.map((s) => (
          <li key={s.vol_id}>
            <div className="card">
              <p>{s.name}</p>
              <p>{s.email}</p>
              <p>{s.phone}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewVolunteer;
