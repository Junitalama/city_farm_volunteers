const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
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

app.get("/sessions/calendar/:date", async (req, res) => {
  let date = req.params.date;
  try {
    const result = await db.query(
      "SELECT * FROM sessions WHERE to_char(date, 'yyyy-mm-dd') = $1 order by ses_id",
      [date]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

// app.post("/booking", (req, res) => {
//   const { date, slot,status,name,email, phone } = req.body;
//   db.query(
//     "insert into booking (date, slot,status,name,email, phone ) values ($1, $2, $3, $4,$5, $6) returning booking_id",
//     [date, slot, status, name, email, phone]
//   )
//     .then((result) => res.status(200).json(result.rows[0]))
//     .catch((err) => res.send(err));
// });

// app.post("/booking", (req, res) => {
//   const { date, slot,status, name, email, phone } = req.body;
//   db.query(
//     "insert into bookings (ses_id, vol_id) values ((select ses_id from sessions where date = $1 and slot = $2 and status = $3), (select vol_id from volunteers where name = $4 and email = $5 and phone = $6)) returning booking_id",
//     [date, slot, status, name, email, phone]
//   )
//     .then((result) => {
//       res.status(201).json(result.rows[0]);
//     })
//     .catch((err) => {
//       console.error("Error adding booking:", err);
//       res
//         .status(500)
//         .json({ error: "An error occurred while adding the booking." });
//     });
// });

app.post("/booking", async (req, res) => {
  const { date, slot, status, name, email, phone } = req.body;
  const query =
    "INSERT INTO bookings (date, slot,status, name, email, phone) VALUES ($1, $2, $3, $4, $5, $6)";
  try {
    await pool.query(query, [date, slot, status, name, email, phone]);
    res.status(201).send("Booking successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error booking date");
  }
});
app.delete("/booking/:id", (req, res) => {
  let idToDelete = Number(req.params.id);
  db.query("delete from bookings where id = $1", [idToDelete])
    .then(() => res.status(200).json({}))
    .catch((err) => res.send(err));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
