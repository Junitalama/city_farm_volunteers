import React, { useState } from "react";

function CancelBookingButton({ bookingId, onDelete }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const deleteBooking = () => {
    fetch(
      `http://ec2-3-9-146-224.eu-west-2.compute.amazonaws.com:5000/bookings/${bookingId}`,
      {
        method: "DELETE",
        mode: "cors",
      }
    )
      .then((res) => {
        if (res.status === 200) {
          onDelete(bookingId);
        }
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
        // Handle error and provide user feedback
      });
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
    deleteBooking();
  };

  return (
    <>
      <button
        className="btn btn-danger"
        onClick={() => setShowConfirmation(true)}
      >
        Cancel Booking
      </button>

      {showConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to cancel this booking?</p>
            <button onClick={handleCancelConfirmation}>Yes</button>
            <button onClick={() => setShowConfirmation(false)}>No</button>
          </div>
        </div>
      )}
    </>
  );
}

export default CancelBookingButton;
