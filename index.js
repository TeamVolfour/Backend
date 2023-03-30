const express = require("express"),
  cors = require("cors");
const { connect } = require("./db/db");

require("dotenv").config;

const app = express();
const port = process.env.PORT || 4040;

app.use(express.json(), cors());
connect()

app.get("/", (req, res) => {
  res.send(`Welcome to the backend - You on the http://localhost:${port}/`);
});

app.listen(port, async () => {
  try {
    console.clear();
    console.log(`\x1b[32mServer on : http://localhost:${port}\n`);

   
  } catch (error) {
    console.error(error);
  }
});
