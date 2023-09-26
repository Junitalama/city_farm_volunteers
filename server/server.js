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

app.get("/volunteers", (req, res) => {
  db.query("select * from volunteers")
    .then((result) => res.json(result.rows))
    .catch((err) => res.send(err));
});

app.get("/volunteers/:slot", (req, res) => {
  let slotLooked = req.params.slot;
  db.query("select * from volunteers where slot like $1 || '%'", [slotLooked])
    .then((result) => res.json(result.rows))
    .catch((err) => res.json(err));
});

app.post("/", (req, res) => {
  const { name, email, phone, slot, date } = req.body;
  db.query(
    "insert into volunteers (name, email, phone, slot, date) values ($1, $2, $3, $4, $5) returning vol_id",
    [name, email, phone, slot, date]
  )
    .then((result) => res.status(200).json(result.rows[0]))
    .catch((err) => res.send(err));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
