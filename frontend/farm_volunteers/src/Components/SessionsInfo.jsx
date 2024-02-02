import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import SelectVolunteer from "./Select";

const Sessions = ({ selectedDate }) => {
  const [sessions, setSessions] = useState([]);
  const [showSlot, setShowSlot] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `http://ec2-3-9-146-224.eu-west-2.compute.amazonaws.com:5000/calendar/${selectedDate}`,
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
      })
      .then((data) => {
        setIsLoading(false);
        setSessions(data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      });
  }, [selectedDate, showSlot]);

  const handleBook = () => {
    // Check if a volunteer is selected
    if (!selectedVolunteer) {
      alert(" booking confirmed.");
      return;
    }

  
    setShowModal(false);
    
  };

  return (
    <div>
      {isLoading ? (
        <h3 className="loading">Loading...</h3>
      ) : (
        <ul>
          {sessions.map((session) => (
            <li key={session.ses_id}>
              <strong>{new Date(session.date).toLocaleDateString()}</strong>
              <br /> {session.slot} session is <strong>{session.status}</strong>
              {session.status === "booked" ? (
                <button onClick={() => setShowSlot(session.ses_id)}>
                  Cancel
                </button>
              ) : (
                <div>
                  <button onClick={() => setShowModal(true)}>Book</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Modal for selecting volunteer */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Select Volunteer Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "40%",
            margin: "auto",
          },
        }}
      >
        <h4>please select your name from here and book a session.</h4>
        <SelectVolunteer
          onSelect={(volunteer) => {
            setSelectedVolunteer(volunteer);
          }}
        />

     
        <button onClick={handleBook}>Confirm Booking</button>
      </Modal>
    </div>
  );
};

export default Sessions;
