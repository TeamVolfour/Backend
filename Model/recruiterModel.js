const { Schema, model, Types } = require("mongoose");
const { isEmail } = require("validator");

const Recruiter = new Schema({
  username: {
    firstname: String,
    lastname: String,
  },
  organizationName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  emailConfirmed: { type: Boolean, default: false },
  roles: { type: Object, default: { Candidate: 301 } },
  badges: Object,
  personalInformations: Object,
  jobsDone: Number,
});

const recruiterModel = model("Recruiter", Recruiter);
module.exports = { recruiterModel };
