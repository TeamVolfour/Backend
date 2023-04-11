const { Schema, model, Types, SchemaTypes } = require("mongoose");
const { isEmail } = require("validator");

const Candidate = new Schema({
  username: { type: String, required: true },
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
  photoUrl: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
  facebookId: String,
  personalInformations: Object,
  jobsDone: Number,
});

const candidateModel = model("Candidate", Candidate);
module.exports = { candidateModel };
