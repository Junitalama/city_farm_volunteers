import React, { useState, useEffect } from "react";
import RegistrationForm from "./Form";

const Api =
  "http://ec2-13-40-132-100.eu-west-2.compute.amazonaws.com:5000/volunteers";

function NewVolunteer() {
  const [session, setSession] = useState([]);

  useEffect(() => {
    fetch(Api, {
      method: "GET",
      mode: "cors",
    })
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

      <ul>
        {session.map((volunteer) => (
          <li key={volunteer.id}></li>
        ))}
      </ul>
    </div>
  );
}

export default NewVolunteer;
