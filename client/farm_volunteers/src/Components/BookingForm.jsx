import React, { useState, useEffect } from "react";
import CalendarData from "./Calendar";

function BookingForm() {
  const [sessions, setSessions] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [slot, setSlot] = useState("");

  // Function to fetch sessions and volunteers
  useEffect(() => {
    // Fetch sessions from your server
    fetch("https://city-farms-db.onrender.com") // Replace with your server's endpoint
      .then((response) => response.json())
      .then((data) => {
        setSessions(data);
      });

    // Fetch volunteers from your server
    fetch("https://city-farms-db.onrender.com/volunteers") // Replace with your server's endpoint
      .then((response) => response.json())
      .then((data) => {
        setVolunteers(data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can create a new booking by sending a POST request to your server
    const newBooking = {
      ses_id: selectedSession,
      vol_id: selectedVolunteer,
      name,
      date,
      email,
      phone,
      slot,
    };

    fetch("https://city-farms-db.onrender.com/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBooking),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or display an alert
        console.log("Booking created:", data);
        // You can show a success message or reset the form fields here
      })
      .catch((error) => {
        console.error("Error creating booking:", error);
        // Handle the error and display an error message
      });
  };

  return (
    <div>
      <h2>Create a New Booking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Session:</label>
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
          >
            <option value="">Select a Session</option>
            {sessions.map((session) => (
              <option key={session.ses_id} value={session.ses_id}>
                {session.date} - {session.slot}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Select Volunteer:</label>
          <select
            value={selectedVolunteer}
            onChange={(e) => setSelectedVolunteer(e.target.value)}
          >
            <option value="">Select a Volunteer</option>
            {volunteers.map((volunteer) => (
              <option key={volunteer.vol_id} value={volunteer.vol_id}>
                {volunteer.name}
              </option>
            ))}
          </select>
        </div>

        

        <div>
          <CalendarData />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label>Slot:</label>
          <input
            type="text"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
          />
        </div>

        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
}

export default BookingForm;
