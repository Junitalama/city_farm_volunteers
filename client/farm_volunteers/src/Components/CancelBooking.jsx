import React from "react";

function CancelBookingButton({ bookingId, onDelete }) {
  const handleDelete = () => {
    fetch(`https://city-farms-db.onrender.com/booking/${bookingId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        onDelete(bookingId);
      }
    })
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Cancel Booking
    </button>
  );
}

export default CancelBookingButton;
