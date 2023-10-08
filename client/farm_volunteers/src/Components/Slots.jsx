import { useEffect, useState } from "react";

const Slots = ({ selectedDate }) => {
  const [slot, setSlot] = useState([]);
  const [showSelectMorning, setShowSelectMorning] = useState(false);
  const [showSelectEvening, setShowSelectEvening] = useState(false);

  useEffect(() => {
    fetch(
      `https://city-farms-db.onrender.com/sessions/calendar/${selectedDate}`
    )
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          throw new Error(`Error: ${res.status}`);
        }
      })
      .then((data) => {
        setSlot(data);
      })
      .catch((Error) => console.log(Error));
  }, [selectedDate, showSelectMorning, showSelectEvening]);

  const selectMorning = () => {
    setShowSelectMorning(!showSelectMorning);
  };

  const selectEvening = () => {
    setShowSelectEvening(!showSelectEvening);
  };
  return (
    <div >
      <ul >
        {slot.map((s) => (
          <li key={s.ses_id}>
           {new Date(s.date).toLocaleDateString()} <br />{" "}
            {s.slot} session is{" "}
            {s.vol_id ? "Booked" : "Available"}
            <button
              onClick={s.slot === "Morning" ? selectMorning : selectEvening}
            >
              {s.vol_id ? "Cancel" : "Book"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Slots;
