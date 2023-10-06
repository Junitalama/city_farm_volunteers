const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
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

app.get("/booking", (req, res) => {
  db.query(
    "select * from bookings join sessions on(bookings.ses_id = sessions.ses_id) join volunteers on(bookings.vol_id = volunteers.vol_id);"
  )
    .then((result) => res.json(result.rows))
    .catch((err) => res.send(err));
});

app.get("/volunteers", (req, res) => {
  db.query("select * from volunteers")
    .then((result) => res.json(result.rows))
    .catch((err) => res.send(err));
});

// app.post("/booking", (req, res) => {
//   const { name, email, phone, slot, date } = req.body;
//   db.query(
//     "insert into booking (name, email, phone, slot, date) values ($1, $2, $3, $4,$5) returning id",
//     [name, email, phone, slot, date]
//   )
//     .then((result) => res.status(200).json(result.rows[0]))
//     .catch((err) => res.send(err));
// });

app.post("/bookings", (req, res) => {
  const { name, phone, email, slot, date, status } = req.body;
  db.query(
    "insert into bookings (ses_id, vol_id) values ((select ses_id from sessions where date = $1 and status = $2), (select vol_id from volunteers where name = $3 and email = $4 and phone = $5)) returning *",
    [date, status, name, email, phone]
  )
    .then((result) => {
      res.status(201).json(result.rows[0]);
    })
    .catch((err) => {
      console.error("Error adding booking:", err);
      res
        .status(500)
        .json({ error: "An error occurred while adding the booking." });
    });
});

// app.delete("/booking/:id", (req, res) => {
//   let idToDelete = Number(req.params.id);
//   db.query("delete from bookings where id = $1", [idToDelete])
//     .then(() => res.status(200).json({}))
//     .catch((err) => res.send(err));
// });

app.delete("/booking/:id", (req, res) => {
  const idToDelete = Number(req.params.id);
  db.query("SELECT * FROM bookings WHERE id = $1", [idToDelete])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Booking not found" });
      }
      db.query("DELETE FROM bookings WHERE id = $1", [idToDelete])
        .then(() => {
          res.status(200).json({ message: "Booking deleted successfully" });
        })
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
