const express = require("express");
const {
  confirmationCompleted,
  getCandidates,
  getCandidate,
  createCandidate,
  deleteAllCandidates,
} = require("../Controller/candidateController");
const {
  signUpCheck,
  loginCheck,
  signUpCheckCandidate,
} = require("../Middleware/userMiddleware");
const router = express.Router();

router
  .get("/candidates", getCandidates)
  .get("/candidate", getCandidate)
  .post("/signupAsCandidate", signUpCheckCandidate, createCandidate)
  .post("/login", loginCheck)
  .get("/confirmation/:id", confirmationCompleted)
  .delete("/candidates", deleteAllCandidates);

exports.candidateRouter = router;
