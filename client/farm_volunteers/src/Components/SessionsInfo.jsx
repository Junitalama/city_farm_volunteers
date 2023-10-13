import React, { useState } from "react";

const Api = "https://city-farms-db.onrender.com";

function SessionInfo() {
  const [session, setSession] = useState([]);
  const [showStatus, setShowStatus] = useState(false);

  const showingStatus = () => {
    fetch(Api)
      .then((res) => res.json())
      .then((data) => {
        setSession(data);
        setShowStatus(true);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  return (
    <div className="volunteer">
      <h4>Sessions Status</h4>
      <button className="btn btn-outline-success" onClick={showingStatus}>
        Show Sessions status
      </button>
      {showStatus && (
        <div className="session_info">
          {session.map((s) => (
            <li key={s.s_id}>
              <div className="card">
                <p>
                  <strong>Date:</strong>
                  {s.date}
                </p>
                <p>
                  <strong>Slot:</strong>
                  {s.slot}
                </p>
                <p>
                  <strong>Status: </strong>
                  <button className="btn btn-outline-success">
                    {s.status}
                  </button>
                </p>
              </div>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

export default SessionInfo;
