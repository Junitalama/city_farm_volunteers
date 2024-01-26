import React from "react";

function CancelBookingButton({ bookingId, onDelete }) {
  const deleteBooking = () => {
    fetch(
      `http://ec2-3-9-146-224.eu-west-2.compute.amazonaws.com:5000//bookings/${bookingId}`,
      {
        method: "DELETE",
        mode:"cors"
      }
    ).then((res) => {
      if (res.status === 200) {
        onDelete(bookingId);
      }
    });
  };

  return (
    <button className="btn btn-danger" onClick={deleteBooking}>
      Cancel Booking
    </button>
  );
}

export default CancelBookingButton;
