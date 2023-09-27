// import { useState, useEffect } from "react";
// import Form from "./Form";

// const AddSlot = () =>   { 
// const [slot, setSlot] = useState([])

//  useEffect (() => {
//     fetch("https://city-farms-db.onrender.com/volunteers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//         setSlot(data);
            
      
//  })
//   .catch((error) => console.error("Error fetching messages:", error));
//  },[]);

//    const handleNewSlot = (newSlot) => {
//      setSlot((s) => [...s, newSlot]);
//    };
//       return (
//         <div>
//           <h2>Latest slot</h2>
//           {slot.map((e) => {
//             return (
//               <li key={e.vol_id}>
//                 <p>Name:{e.name}</p>
//                 <p>Email:{e.email}</p>
//                 <p>phone:{e.phone}</p>
//                 <p>date:{e.date}</p>
//               </li>
//             );
//           })}
//           <Form onAdd={handleNewSlot} />
//         </div>
//       );
//         }
//       export default AddSlot;