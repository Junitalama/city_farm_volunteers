const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.SERVER_PORT || 3000;
const bodyParser = require("body-parser");
// NEW - replace custom middleware with the cors() middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send({
    msg: "Hello, World",
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
