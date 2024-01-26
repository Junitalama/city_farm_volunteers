import React, { useState, useEffect } from "react";
import CalendarData from "./Calendar";

const Api =
  "http://ec2-3-9-146-224.eu-west-2.compute.amazonaws.com:5000//bookings";

function BookSession() {
  const [session, setSession] = useState([]);

  useEffect(() => {
    fetch(Api)
      .then((res) => res.json())
      .then((data) => {
        setSession(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  return (
    <div>
      <CalendarData />
    </div>
  );
}

export default BookSession;
