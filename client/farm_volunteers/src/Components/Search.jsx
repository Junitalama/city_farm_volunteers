import React, { useState } from "react";


const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [slots, setSlots] = useState([]);
  

  function handleSearchInput() {
  
    
      fetch(`https://city-farms-db.onrender.com/volunteers/search?term = ${searchInput}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("Something went wrong");
          }
          return res.json();
        })
        .then((data) => {
          setSlots(data);
        });
  }
 

  return (
    <div className="search">
      <div className="page-header">
        <h4 className="text-left">
          Search volunteers by slot(available/booked/canceled)
        </h4>
      </div>
      <div className="row search-wrapper">
        <div className="col">
          <form className="form-group search-box">
            <label htmlFor="customerName"></label>
            <div className="search-row">
              <input
                type="text"
                id="customerName"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="form-control"
                placeholder=""
              />
              <button onClick = {handleSearchInput} className="btn btn-primary" type="submit">
                SUBMIT
              </button>
            </div>
         <ul>
              {slots.map((s) => (
               <li key ={s.vol_id}>
                  {s.name}
                    {s.phone}
                    {s.email}
                    {s.slot}
                    {s.date}
                  </li>
                
              ))}
            </ul>
        
      </form>
     </div>
     </div>
    </div>
  );
};

export default Search;
