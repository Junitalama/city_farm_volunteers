import React, { useState } from "react";

const Api = "https://city-farms-db.onrender.com/volunteers";

function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const volunteersProfile = () => {
    fetch(Api)
      .then((res) => res.json())
      .then((data) => {
        setVolunteers(data);
        setShowProfile(true);
      })
      .catch((error) => console.error("error", error));
  };

  return (
    <div className = "manager">
      <h4 id ="profile" className = "volunteers_sec">Meet our Volunteers</h4>
      <button className="btn btn-outline-warning" onClick={volunteersProfile}>
        Show Profile
      </button>
      {showProfile && (
        <div className="volunteers" id="profile">
          {volunteers.map((s) => (
            <li key={s.vol_id}>
              <div className="card_2">
                <p>Name :{s.name}</p>
                <p>Email :{s.email}</p>
                <p>Phone :{s.phone}</p>
              </div>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
export default Volunteers;
