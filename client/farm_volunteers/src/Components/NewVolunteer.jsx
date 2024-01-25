import React, { useState, useEffect } from "react";
import RegistrationForm from "./Form";

const Api =
  "http://ec2-13-43-88-172.eu-west-2.compute.amazonaws.com//volunteers";

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
