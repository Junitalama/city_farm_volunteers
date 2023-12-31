import React, { useState, useEffect } from "react";
import RegistrationForm from "./Form";

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
      <RegistrationForm onAdd={handleAdd} />
    </div>
  );
}

export default NewVolunteer;
