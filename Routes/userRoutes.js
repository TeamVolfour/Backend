const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  deleteAllUser,
  confirmationCompleted,
} = require("../Controller/candidateController");
const { signUpCheck, loginCheck } = require("../Middleware/userMiddleware");
const router = express.Router();

router
  .get("/users", getUsers)
  .get("/user", getUser)
  .post("/signup", signUpCheck, createUser)
  .post("/login", loginCheck)
  .get("/confirmation/:token", confirmationCompleted)
  .delete("/users", deleteAllUser);

exports.userRouter = router;
