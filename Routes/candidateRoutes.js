const express = require("express");
const {
  getCandidates,
  getCandidate,
  createCandidate,
  deleteAllCandidates,
  cVerifyCompleted,
  signupWithFacebook,
  signupWithGoogle,

} = require("../Controller/candidateController");
const {
  login,
  otpCheck,
  tokenResponse,
  loginWithGoogle,
  loginWithFacebook
} = require("../Controller/commonController");
const {
  signUpCheck,
  loginCheck,
  signUpCheckCandidate,
} = require("../Middleware/auth.middleware");
const { roleMiddleware } = require("../Middleware/role.middleware");
const { facebookLoginCheck, googleLoginCheck, facebookSignupCheck, googleSignupCheck } = require("../Middleware/socialAuth.middleware");


const router = express.Router();

router
  .get("/candidates", roleMiddleware(401), getCandidates)
  .get("/candidate/:id", getCandidate)
  .post("/signup/candidate", signUpCheckCandidate, createCandidate)
  .post("/signup/fb/candidate", facebookSignupCheck, signupWithFacebook)
  .post("/signup/google/candidate", googleSignupCheck, signupWithGoogle)
  .post("/login/fb", facebookLoginCheck, loginWithFacebook)
  .post("/login/google", googleLoginCheck, loginWithGoogle)
  .post("/login", loginCheck, login)
  .post("/otpCheck", otpCheck)
  .post("/token-response", tokenResponse)
  .get("/candidate/confirmation/:id", cVerifyCompleted)
  .delete("/candidates", deleteAllCandidates);

exports.candidateRouter = router;
