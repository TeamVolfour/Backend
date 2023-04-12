const express = require("express");
const {
  getCandidates,
  getCandidate,
  createCandidate,
  deleteAllCandidates,
  cVerifyCompleted,
  loginWithFirebaseAuth,
  loginAsCandidate,
} = require("../Controller/candidateController");
const {
  signUpCheck,
  loginCheck,
  signUpCheckCandidate,
  facebookLoginCheck,
} = require("../Middleware/userMiddleware");
const router = express.Router();

router
  .get("/candidates", getCandidates)
  .get("/candidate", getCandidate)
  .post("/signup/candidate", signUpCheckCandidate, createCandidate)
  .post("/login/fb/candidate", facebookLoginCheck, loginWithFirebaseAuth)
  .post("/login", loginCheck, loginAsCandidate)
  .get("/candidate/confirmation/:id", cVerifyCompleted)
  .delete("/candidates", deleteAllCandidates);

exports.candidateRouter = router;
