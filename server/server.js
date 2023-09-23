const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
// NEW - replace custom middleware with the cors() middleware
app.use(cors());
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

app.listen(port, () => console.log(`Listening on port ${port}`));
