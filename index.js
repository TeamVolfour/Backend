const express = require("express"),
  cors = require("cors");
const { connect } = require("./config/db/db");
const { userRouter } = require("./Routes/userRoutes");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json(), cors());
app.use(userRouter)
connect()

app.get("/", (req, res) => {
  res.send(`Welcome to the Volfour backend - You on the http://localhost:${port}/`);
});

app.listen(port, async () => {
  try {
    console.clear();
    console.log(`\x1b[32mServer on : http://localhost:${port}\n`);
  } catch (error) {
    console.error(error);
  }
});

