import { useState, useEffect } from "react";
import Form from "./Form";

const AddSlot = () =>   { 
const [slot, setSlot] = useState([])

 useEffect (() => {
    
      fetch("https://city-farms-db.onrender.com/volunteers")
       
        .then((response) => response.json())
        .then((data) => {
          setSlot(data)
        })
        .catch((error) => console.error("Error", error));
    },[slot]);
      const handleNewSlot = (newSlot) => {
        setSlot((s) => [...s, newSlot]);
      };
      return (
        <div>
          <Form onAdd={handleNewSlot} />
          <h2>Latest slot</h2>{

          }
    
          <ul>
            {slot.map((e) => {
              return (
                <li key={e.vol_id}>
                  <p>Name:{e.name}</p>
                  <p>Email:{e.email}</p>
                  <p>phone:{e.phone}</p>
                  <p>date:{e.date}</p>
                  
                </li>
              );
            })}
          </ul>
        </div>
      );
      }
      export default AddSlot;