const express = require("express"),
  cors = require("cors");
const { connect } = require("./config/db/db");
const { candidateRouter } = require("./Routes/candidateRoutes");
const { recruiterRouter } = require("./Routes/recruiterRoutes");
const { jobPostRouter } = require("./Routes/jobPost.routes");
const { JobCategoryModel } = require("./Model/jobCategory.model");
const { jobCategoryRouter } = require("./Routes/jobCategory.routes");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;
var bodyParser = require("body-parser");
const multer = require("multer");
var forms = multer();

app.use(cors());
app.use(express.json());
// app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(candidateRouter, recruiterRouter, jobPostRouter, jobCategoryRouter);
connect();

app.get("/", (req, res) => {
  res.send(
    `Welcome to the Volfour backend - You on the http://localhost:${port}/`
  );
});

app.listen(port, async () => {
  try {
    console.clear();
    console.log(`\x1b[32mServer on : http://localhost:${port}\n`);
  } catch (error) {
    console.error(error);
  }
});
