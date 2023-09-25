const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
// NEW - replace custom middleware with the cors() middleware
app.use(cors({ AllowedHeaders: ["Content-Type", "Authorization"] }));
app.use(bodyParser.urlencoded({ extended: false }));
const { Pool } = require("pg");
const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});
app.use(bodyParser.json());
app.get("/", (req, res) => {
  db.query("select * from sessions")
    .then((result) => res.json(result.rows))
    .catch((err) => res.send(err));
});

// app.get("/volunteers",(req, res) =>{
//   db.query("select * from volunteers where slot ilike '%booked%'")
//     .then((result) => res.json(result.rows))
//     .catch((err) => res.send(err));
// })


app.get("/volunteers/:slot", (req, res) => {
  let slotLooked = req.params.slot;
  
    db.query(
      "select * from volunteers where slot like $1 || '%'",
      [slotLooked])
    
      .then((result) => res.json(result.rows))
      .catch((err) => res.json(err));
  })
app.listen(port, () => console.log(`Listening on port ${port}`));
