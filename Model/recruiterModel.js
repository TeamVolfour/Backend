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

    // validate: [isEmail, "Please enter a valid email"],
  },
  bannerImg: String,
  phoneNumber: {
    type: Number,
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
  companyLocation: String,
  googleId: String,
  personalInformations: Object,
  jobsOrganised: [{ type: Schema.Types.ObjectId, ref: "JobPost" }],
  blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  companyLocation: String,
  socialInformations: {
    websiteUrl: String,
    facebook: String,
    instagram: String,
    Twitter: String
  },
  createdAt: { type: Date, default: Date.now() },

});

const recruiterModel = model("Recruiter", Recruiter);
module.exports = { recruiterModel };
