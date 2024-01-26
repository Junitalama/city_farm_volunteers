import { useEffect, useState } from "react";
import SelectVolunteer from "./Select";



const Sessions = ({ selectedDate }) => {
  const [sessions, setSessions] = useState([]);
  const [showSlot, setShowSlot] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log(selectedDate);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `http://ec2-3-9-146-224.eu-west-2.compute.amazonaws.com:5000//calendar/${selectedDate}`,
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
      .catch((Error) => {
        setIsLoading(false);
      });
  }, [selectedDate, showSlot]);

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
                <button
                  onClick={() => {
                    setShowSlot(session.ses_id);
                  }}
                >
                  Cancel
                </button>
              ) : (<div>
                <SelectVolunteer />
                <button>book</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
     
     
    </div>
  );
};

export default Sessions;
