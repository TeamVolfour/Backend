const { Schema, model, Types } = require("mongoose");
const { isEmail } = require("validator");

const Candidate = new Schema({
  username: {
    firstname: String,
    lastname: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  emailConfirmed: { type: Boolean, default: false },
  roles: { type: Object, default: { Candidate: 200 } },
  badges: Object,
  personalInformations: Object,
  jobsDone: Number,
});

const candidateModel = model("Candidate", Candidate);
module.exports = { candidateModel };