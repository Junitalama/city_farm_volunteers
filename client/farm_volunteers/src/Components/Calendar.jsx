import React, { useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";

function CalendarData() {
  const [date, setDate] = useState(new Date());
  const [slot, setSlot] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleBooking = async () => {
    try {
      await axios.post("/https://city-farms-db.onrender.com/booking", {
        date,
        slot,
        status,
        name,
        email,
        phone,
      });
      // Add logic to update UI as needed
    } catch (error) {
      console.error("Error booking date:", error);
    }
  };

  return (
    <div>
      <Calendar onChange={handleDateChange} value={date} />
      <input
        type="text"
        placeholder="slot"
        value={slot}
        onChange={(e) => setSlot(e.target.value)}
      />
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button onClick={handleBooking}>Book Date</button>
    </div>
  );
}

export default CalendarData;
