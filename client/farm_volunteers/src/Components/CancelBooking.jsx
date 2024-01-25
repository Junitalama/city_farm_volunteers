import React from "react";

function CancelBookingButton({ bookingId, onDelete }) {
  const deleteBooking = () => {
    fetch(
      `http://ec2-13-43-88-172.eu-west-2.compute.amazonaws.com//bookings/${bookingId}`,
      {
        method: "DELETE",
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
