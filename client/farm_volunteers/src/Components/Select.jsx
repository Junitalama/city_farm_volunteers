import React, { useEffect, useState } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

const SelectVolunteer = () => {
  const [volunteer, setVolunteer] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch("https://city-farms-db.onrender.com/booking")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setVolunteer(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSelectChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div>
      <FormControl>
        <Select value={selected} onChange={handleSelectChange}>
          {volunteer.map((v) => (
            <MenuItem key={v.booking_id} value={v.booking_id}>
              {v.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectVolunteer;
