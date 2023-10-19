import React, { useState } from "react";

function BookingForm({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      setError("Please fill out all fields");
      return;
    }

    

    const newBooking = {
      name,
      email,
      phone,
    };

    try {
      const response = await fetch(
        "https://city-farms-db.onrender.com/volunteers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBooking),
        }
      );

      if (response.ok) {
        const data = await response.json();
        onAdd(newBooking);
        setName("");
        setEmail("");
        setPhone("");
        setError(null);
        console.log(data);
      } else {
        setError("Server error. Please try again later.");
      }
    } catch (error) {
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div>
      <h3>New volunteers, please register here</h3>
      <form id="form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
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
