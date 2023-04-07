const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  deleteAllUser,
  confirmationCompleted,
} = require("../Controller/candidateController");
const { signUpCheck, loginCheck, signUpCheckCandidate } = require("../Middleware/userMiddleware");
const router = express.Router();

router
  .get("/users", getUsers)
  .get("/user", getUser)
  .post("/signup", signUpCheckCandidate, createUser)
  .post("/login", loginCheck)
  .get("/confirmation/:id", confirmationCompleted)
  .delete("/users", deleteAllUser);

exports.userRouter = router;
