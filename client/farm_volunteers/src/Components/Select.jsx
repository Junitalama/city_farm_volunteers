import { useEffect, useState } from "react";


const ShowSelect = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [selectValue, setSelectValue] = useState(null);
  
  useEffect(() => {
    fetch("https://city-farms-db.onrender.com/volunteers")
      .then((res) => res.json())
      
      .then((data) => {
        setVolunteers(data);
      })
      .catch((Error) => console.log(Error));
  }, []);

  function handleChange(event) {
    setSelectValue(event.target.value);
  }
  return (
   <div>
      {selectValue && (
        <div>
          <div>
            <p>Select your name</p>
          </div>
          <select
            onChange={handleChange}
           
          >
            <option value="">Select</option>
            {volunteers.map((volunteer) => (
              <option key={volunteer.vol_id} value={volunteer.vol_id}>
                {volunteer.name}
              </option>
            ))}
          </select>
          </div>)}
          </div>
  )
            }
  
           

  export default ShowSelect;
  
    

    