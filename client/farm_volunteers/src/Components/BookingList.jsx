import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CancelBookingButton from "./CancelBooking";

const Api =
  "http://ec2-3-9-146-224.eu-west-2.compute.amazonaws.com:5000/bookings";

function BookingList() {
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

  const handleDelete = (id) => {
    fetch(`${Api}/${id}`, {
      method: "DELETE",
      mode:"cors"
    })
      .then(() => {
        setSession((prevBooking) =>
          prevBooking.filter((booking) => {
            console.log(id);
            console.log(booking.id);
            return booking.booking_id !== id;
          })
        );
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Booking List
      </Typography>

      <div className="session">
        {session.map((s) => (
          <li key={s.booking_id}>
            <div className="card">
              <p>{s.date}</p>
              <p>
                <strong>Slot:</strong>
                {s.slot}
              </p>
              <p>
                <strong>Status: </strong>
                <button className="btn btn-outline-success">{s.status}</button>
              </p>
              <p>
                <strong>Booked By:</strong>
                {s.name}
              </p>
              <p> {s.email}</p>
              <p> {s.phone}</p>
            </div>
            <CancelBookingButton
              bookingId={s.booking_id}
              onDelete={handleDelete}
            />
          </li>
        ))}
      </div>
    </div>
  );
}

export default BookingList;
