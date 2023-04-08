const express = require("express");
const {
  getRecruiters,
  getRecruiter,
  createRecruiter,
  deleteAllRecruiter,
  confirmationCompleted,
} = require("../Controller/recruiterController");
const {
  signUpCheckRecruiter,
  loginCheck,
} = require("../Middleware/userMiddleware");
const router = express.Router();

router
  .get("/recruiters", getRecruiters)
  .get("/recruiter", getRecruiter)
  .post("/signup/recruiter", signUpCheckRecruiter, createRecruiter)
  .post("/login", loginCheck)
  .get("/confirmation/:id", confirmationCompleted)
  .delete("/recruiters", deleteAllRecruiter);

exports.recruiterRouter = router;
