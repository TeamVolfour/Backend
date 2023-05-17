const { Schema, model, Types, SchemaTypes } = require("mongoose");
const { isEmail } = require("validator");

const Candidate = new Schema({
  fullname: {
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
  roles: { type: Object, default: { candidate: 200 } },
  badges: Object,
  bannerImg: String,
  phoneNumber: Number,
  photoUrl: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
  facebookId: String,
  googleId: String,
  certificates: [{
    type: Schema.Types.ObjectId, ref: "Certificate"
  }],
  personalInformations: Object,
  socialInformations: {
    facebook: String,
    instagram: String,
    Twitter: String
  },
  jobsDone: [{ type: Schema.Types.ObjectId, ref: "JobPost" }],
  createdAt: { type: Date, default: Date.now() },

});

const candidateModel = model("Candidate", Candidate);
module.exports = { candidateModel };
