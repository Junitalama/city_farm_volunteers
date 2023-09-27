import React, { useState } from "react";


const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [slots, setSlots] = useState([]);
  

  function handleSearchInput(e) {
    setSearchInput(e.target.value);
    
      fetch("https://city-farms-db.onrender.com/volunteers/:slot")
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
                onChange={handleSearchInput}
                className="form-control"
                placeholder=""
              />
              <button className="btn btn-primary" type="submit">
                SUBMIT
              </button>
            </div>
          </form>
          <table className="table my-5">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>phone</th>
                <th>slot</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((s) => {
                return (
                  <tr>
                    <td>{s.name}</td>
                    <td>{s.phone}</td>
                    <td>{s.email}</td>
                    <td>{s.slot}</td>
                    <td>{s.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Search;
