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
        <div className="select-container">
          <div className=" mt-3 text-center">
            <p>Select your name</p>
          </div>
          <select
            onChange={handleChange}
            className="form-control form-control-sm mb-3 mt-3 w-50 mx-auto"
          >
            <option value="">Select</option>
            {volunteers.map((volunteer, index) => (
              <option key={index} value={volunteer.vol_id}>
                {volunteer.name}
              </option>
            ))}
          </select>
          </div>)}
          </div>
  )
            }
  
           

  export default ShowSelect;
  
    

    