import React, { useEffect, useState } from "react";

function SelectSessions() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

useEffect(() => {
  fetch("https://city-farms-db.onrender.com/volunteers")
    .then((res) => res.json())
    .then((data) => {
      setSessions(data)
      setSelectedSession(true)
    })
    .catch((error) => console.error("Error fetching data: ", error));
}, []);
 

  return (
    <select>
      {sessions.map((session) => (
        <option key={session.vol_id} value={session.vol_id}>
          {session.name} 
        </option>
      ))}
    </select>
  );
}
export default SelectSessions;