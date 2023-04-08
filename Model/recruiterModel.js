const { Schema, model, Types } = require("mongoose");
const { isEmail } = require("validator");

const Recruiter = new Schema({
  username: { type: String, required: true },
  organizationName: {
    type: String,
    required: true,
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
  jobsOrganised: Number,
});

const recruiterModel = model("Recruiter", Recruiter);
module.exports = { recruiterModel };
