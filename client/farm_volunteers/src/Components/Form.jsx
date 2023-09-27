import React, { useState } from "react";

const Form = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && date) {
      onAdd({ name, email, phone, date });
      setName("");
      setEmail("");
      setPhone("");

      setDate("");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="add">Fill your details to book a slot </p>
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
      <button className="btn btn-primary" type="submit">
        Book your slot
      </button>
    </form>
  );
};

export default Form;
