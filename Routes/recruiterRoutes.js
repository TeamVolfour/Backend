const express = require("express");
const {
  getRecruiters,
  getRecruiter,
  createRecruiter,
  deleteAllRecruiter,
  confirmationCompleted,
  rVerifyCompleted,
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
  .post("/login/recruiter", loginCheck)
  .get("/recruiter/confirmation/:id", rVerifyCompleted)
  .delete("/recruiters", deleteAllRecruiter);

exports.recruiterRouter = router;
