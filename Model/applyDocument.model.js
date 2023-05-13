const { Schema, model, Types, SchemaTypes } = require("mongoose");
const { isEmail } = require("validator");
const ApplyDoc = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  userImg: String,
  phoneNumber: {
    type: Number,
    minlength: [8, "Please use valid phone number"],
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "Candidate" },
  coverLetter: String,
  createdAt: { type: Date, default: Date.now() },
});

const ApplyDocModel = model("ApplyDoc", ApplyDoc);
module.exports = { ApplyDocModel };
