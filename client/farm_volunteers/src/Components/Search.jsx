import { useEffect } from "react";
import { useState } from "react";

const SearchBar = ({ slot }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`localhost:3000/volunteers/${slot}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVolunteers(data);
        setLoading(false);
      })

      .catch((error) => {
        console.error("error fetching data", error);
        setLoading(false);
      });
  }, [slot]);
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="search">
      <div>
        <p className="search_title">Search for Available/Booked/Cancelled slot</p>
        <input
          className="search_input"
          id="search"
          type="search"
          placeholder="Search..."
        />
        <button>search</button>
      </div>

      <div>
        {volunteers.map((slot) => {
          return (
            <li key={slot.vol_id}>
              <h4>{slot.name}</h4>
              <p>{slot.slot}</p>
              <p></p>
            </li>
          );
        })}
      </div>
    </div>
  );
};
export default SearchBar;
