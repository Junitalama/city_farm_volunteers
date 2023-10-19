import React, { useState, useEffect } from "react";

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
    newVolunteer.status = "booked";
    setSession((prevSession) => [...prevSession, newVolunteer]);
  };

 

  return (
    <div>
    {session &&
      <BookingForm onAdd={handleAdd} />
    }

          
    </div>
  );
}

export default NewVolunteer;
