import React, { useState } from "react";

function BookingForm({ onAdd }) {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
      date,
      slot,
      status,
      name,
      email,
      phone,
    };

    fetch("https://city-farms-db.onrender.com/volunteers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBooking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    onAdd(newBooking);
    
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div>
      <h3>New voluneers, please Register here</h3>
      <form id="form" onSubmit={handleSubmit}>
       
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

        
        <button className="btn btn-info" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
