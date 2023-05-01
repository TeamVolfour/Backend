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
  loginWithGoogle,
  loginWithFacebook,
} = require("../Controller/recruiterController");
const {
  signUpCheckRecruiter,
  loginCheck,
  signUpCheckCompany,
} = require("../Middleware/auth.middleware");
const { roleMiddleware } = require("../Middleware/role.middleware");
const { googleLoginCheck2, facebookLoginCheck2 } = require("../Middleware/socialAuth.middleware");
const router = express.Router();

router
  .get("/recruiters", roleMiddleware(401), getRecruiters)
  .get("/recruiter/:id", getRecruiter)
  .post("/signup/recruiter-person", signUpCheckRecruiter, createRecruiter)
  .post("/signup/recruiter-company", signUpCheckCompany, createCompany)
  .post("/login/google/recruiter", googleLoginCheck2, loginWithGoogle)
  .post("/login/fb/recruiter", facebookLoginCheck2, loginWithFacebook)

  .post("/login/recruiter", loginCheck)
  .get("/recruiter/confirmation/:id", rVerifyCompleted)
  .delete("/recruiters", deleteAllRecruiter);

exports.recruiterRouter = router;
