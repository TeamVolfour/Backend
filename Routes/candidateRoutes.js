const express = require("express");
const {
  getCandidates,
  getCandidate,
  createCandidate,
  deleteAllCandidates,
  cVerifyCompleted,
  loginWithFacebook,
  loginWithGoogle,
} = require("../Controller/candidateController");
const {
  login,
  otpCheck,
  tokenResponse,
} = require("../Controller/commonController");
const {
  signUpCheck,
  loginCheck,
  signUpCheckCandidate,
} = require("../Middleware/auth.middleware");
const { roleMiddleware } = require("../Middleware/role.middleware");
const { facebookLoginCheck, googleLoginCheck } = require("../Middleware/socialAuth.middleware");

const router = express.Router();

router
  .get("/candidates", roleMiddleware(401), getCandidates)
  .get("/candidate/:id", getCandidate)
  .post("/signup/candidate", signUpCheckCandidate, createCandidate)
  .post("/login/fb/candidate", facebookLoginCheck, loginWithFacebook)
  .post("/login/google/candidate", googleLoginCheck, loginWithGoogle)
  .post("/login", loginCheck, login)
  .post("/otpCheck", otpCheck)
  .post("/token-response", tokenResponse)
  .get("/candidate/confirmation/:id", cVerifyCompleted)
  .delete("/candidates", deleteAllCandidates);

exports.candidateRouter = router;
