const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
app.use(
  cors({
    origin: "http://farmcity.s3-website.eu-west-2.amazonaws.com", // Replace with your frontend origin
    credentials: true, // Allow credentials (cookies, HTTP authentication)
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false},
});
app.use(bodyParser.json());


app.get("/", (req, res) => {
  db.query("select * from sessions")
  
    .then((result) => res.json(result.rows))
    .catch((err) => res.send(err));
});

app.get("/bookings", (req, res) => {
  db.query(
    "SELECT * FROM bookings JOIN sessions ON bookings.ses_id = sessions.ses_id JOIN volunteers ON bookings.vol_id = volunteers.vol_id;"
  )
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});


app.get("/volunteers", (req, res) => {
  db.query("select * from volunteers")
    .then((result) => res.json(result.rows))
    .catch((err) => res.send(err));
});

app.get("/calendar/:date", async (req, res) => {
  let date = req.params.date;
  try {
    const result = await db.query(
      "select * from sessions where to_char(date, 'yyyy-mm-dd') = $1 order by ses_id",
      [date]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "could not fetch sessions" });
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

// app.post("/booking", async (req, res) => {
//   try {
//     const { ses_id, vol_id } = req.body;

//     const sessionExists = await db.query("select * from sessions where ses_id = $1", [ses_id]);
//     console.log("sessions" ,sessionExists);
//     const volunteerExists = await db.query("select * from volunteers where vol_id = $1",[vol_id]);
//     if (!volunteerExists) {
//       return res
//         .status(404)
//         .json({ message: "Session or volunteer not found" });
//     }

//     await db.query("insert into bookings (ses_id,vol_id) values ($1, $2)", [
//       ses_id,
//       vol_id,
//     ]);
//     res.status(200).json({ message: "Booking created successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error creating booking" });
//   }
// });
app.post("/bookings", async (req, res) => {
  try {
    const { ses_id, vol_id } = req.body;

    // Check if the session exists
    const sessionExists = await db.query(
      "SELECT * FROM sessions WHERE ses_id = $1",
      [ses_id]
    );
    if (sessionExists.rows.length === 0) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Check if the volunteer exists
    const volunteerExists = await db.query(
      "SELECT * FROM volunteers WHERE vol_id = $1",
      [vol_id]
    );
    if (volunteerExists.rows.length === 0) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    // Create the booking
    await db.query("INSERT INTO bookings (ses_id, vol_id) VALUES ($1, $2)", [
      ses_id,
      vol_id,
    ]);

    res.status(200).json({ message: "Booking created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating booking" });
  }
});

//for new registration
app.post("/volunteers", function (req, res) {
  const newName = req.body.name;
  const newEmail = req.body.email;
  const newPhone = req.body.phone;

  const query = `INSERT INTO volunteers (name, phone, email) VALUES ($1, $2, $3)`;

  db.query(query, [newName, newEmail, newPhone])
    .then(() => {
      res.status(200).json({ status: `registration succesfull` });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
});

app.delete("/bookings/:id", (req, res) => {
  let idToDelete = Number(req.params.id);
  db.query("delete from bookings where id = $1", [idToDelete])
    .then(() => res.status(200).json({}))
    .catch((err) => res.send(err));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
