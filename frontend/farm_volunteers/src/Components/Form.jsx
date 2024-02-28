import React, { useState } from "react";

function RegistrationForm({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const alertMessage = () => {
    alert("Booking successful!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      setError("Please fill out all fields");
      return;
    }

    const newRegistration = {
      name,
      email,
      phone,
    };

    try {
      const response = await fetch(
        "http://ec2-13-40-132-100.eu-west-2.compute.amazonaws.com:5000/volunteers",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRegistration),
        }
      );

      if (response.ok) {
        const data = await response.json();
        onAdd(newRegistration);
        setName("");
        setEmail("");
        setPhone("");
        setError(null);
        alertMessage();
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
      <h3>Hello volunteers, please register here</h3>
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

export default RegistrationForm;
