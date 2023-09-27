import React, { useState } from "react";

const Form = ({ onAdd }) => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [date, setDate] = useState("");
    

  const newSlot = {
    name,
    email,
    phone,
    date
  };

      fetch("https://city-farms-db.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSlot),
      })
        .then((res) => res.json())
        .then((data) => {
            onAdd(data);
            setName("");
            setEmail("");
            setPhone("");
            setDate("");
        })
      
  return (
    <form className="form">
      <p className="add">Add your videos </p>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="tel"
          placeholder="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="date"
          placeholder="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Book your slot </button>
    </form>
  );
};

export default Form;
