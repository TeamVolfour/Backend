const { Schema, model, Types, SchemaTypes } = require("mongoose");
const { isEmail } = require("validator");
const ApplyDoc = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: [isEmail, "Please enter a valid email"],
    },
    phoneNumber: { type: Number, minlength: [8, "Please use valid phone number"], required: true },
    coverLetter: String
});

const ApplyDocModel = model("ApplyDoc", ApplyDoc);
module.exports = { ApplyDocModel };
