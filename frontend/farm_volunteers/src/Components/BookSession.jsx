import React, { useState, useEffect } from "react";
import CalendarData from "./Calendar";

const Api =
  "http://ec2-13-40-132-100.eu-west-2.compute.amazonaws.com:5000/bookings";

function BookSession() {
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

  return (
    <div>
      <CalendarData session={session} />
    </div>
  );
}

export default BookSession;
