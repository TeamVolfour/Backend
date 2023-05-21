const express = require("express");
const {
  getRecruiters,
  getRecruiter,
  createRecruiter,
  deleteAllRecruiter,
  confirmationCompleted,
  rVerifyCompleted,
  tokenResponse,
  createCompany,
  signupWithGoogle,
  signupWithFacebook,
  updateRecruiter,
} = require("../Controller/recruiterController");
const {
  signUpCheckRecruiter,
  loginCheck,
  signUpCheckCompany,
} = require("../Middleware/auth.middleware");
const { roleMiddleware } = require("../Middleware/role.middleware");
const {
  googleSignupCheck2,
  facebookSignupCheck2,
} = require("../Middleware/socialAuth.middleware");
const router = express.Router();

router
  .get("/recruiters", roleMiddleware(401), getRecruiters)
  .get("/recruiter/confirmation/:id", rVerifyCompleted)
  .get("/recruiter/:id", getRecruiter)
  .post("/signup/recruiter-person", signUpCheckRecruiter, createRecruiter)
  .post("/signup/recruiter-company", signUpCheckCompany, createCompany)
  .post("/signup/google/recruiter", googleSignupCheck2, signupWithGoogle)
  .post("/signup/fb/recruiter", facebookSignupCheck2, signupWithFacebook)
  .post("/login/recruiter", loginCheck)
  .put('/update/recruiter/:id', updateRecruiter)
  .delete("/recruiters", deleteAllRecruiter);

exports.recruiterRouter = router;
