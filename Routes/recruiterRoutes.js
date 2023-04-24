const express = require("express");
const {
  getRecruiters,
  getRecruiter,
  createRecruiter,
  deleteAllRecruiter,
  confirmationCompleted,
  rVerifyCompleted,
  tokenResponse,
} = require("../Controller/recruiterController");
const {
  signUpCheckRecruiter,
  loginCheck,
} = require("../Middleware/userMiddleware");
const { roleMiddleware } = require("../Middleware/role.middleware");
const router = express.Router();

router
  .get("/recruiters", roleMiddleware(401), getRecruiters)
  .get("/recruiter/:id", getRecruiter)
  .post("/signup/recruiter", signUpCheckRecruiter, createRecruiter)
  .post("/login/recruiter", loginCheck)
  .get("/recruiter/confirmation/:id", rVerifyCompleted)
  .delete("/recruiters", deleteAllRecruiter);

exports.recruiterRouter = router;
