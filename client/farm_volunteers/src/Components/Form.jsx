import React, { useState } from "react";

function BookingForm({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [slot, setSlot] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new booking object
    const newBooking = {
      name,
      email,
      phone,
      slot,
      date,
      status,
    };

     fetch("https://city-farms-db.onrender.com/booking", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(newBooking),
     })
       .then((res) => res.json())
       .then((data) => {
         console.log(data);
         onAdd(newBooking);

         setName("");
         setEmail("");
         setPhone("");
         setSlot("");
         setDate("");
         setStatus("");
       });

    
    onAdd(newBooking);

    setName("");
    setEmail("");
    setPhone("");
    setSlot("");
    setDate("");
    setStatus("");
  };

  return (
    <div>
      <h2>Book a Slot</h2>
      <form  id ="form" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Slot:</label>
          <input
            type="text"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            
          />
        </div>
        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default BookingForm;
