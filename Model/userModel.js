const { Schema, model, Types } = require("mongoose");
const { isEmail } = require("validator");

const User = new Schema({
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
  roles: { type: Object, required: true},
  badges: Object,

});
const userModel = model("User", User);
module.exports = { userModel };
