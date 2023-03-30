const { Schema, model, Types } = require("mongoose");
const { isEmail } = require("validator");

const User = new Schema({
  gender: String,
  username: {
    first: String,
    last: String,
  },
  password: String,
  photoUrl: String,
  locations: String,
  password: {
    type: String,
    required: [true, "Please enter an password"],
    minlength: [6, "Minimum password length is 6 character"],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  roles: { type: Object, required: true},
});
const userModel = model("User", User);
module.exports = { userModel };
