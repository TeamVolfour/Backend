const { Schema, model, Types } = require("mongoose");
const { isEmail } = require("validator");

const Recruiter = new Schema({
  fullname: {
    firstname: String,
    lastname: String,
  },
  companyName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  bannerImg: String,
  phoneNumber: {
    type: Number,
    minlength: [8, "Minimum phonenumber length is 8"],
  },
  photoUrl: {
    type: String,
    default:
      "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
  },
  emailConfirmed: { type: Boolean, default: false },
  roles: { type: Object, default: { recruiter: 301 } },
  badges: Object,
  facebookId: String,
  googleId: String,
  personalInformations: Object,
  jobsOrganised: Number,
});

const recruiterModel = model("Recruiter", Recruiter);
module.exports = { recruiterModel };
