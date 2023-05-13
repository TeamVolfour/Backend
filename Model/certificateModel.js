const { Schema, model, Types, SchemaTypes } = require("mongoose");
const Certificate = new Schema({
  holder: { type: Schema.Types.ObjectId, ref: "Candidate" },
  createdAt: { type: Date, default: Date.now() },
});

const CertificateModel = model("Certificate", Certificate);
module.exports = { CertificateModel };
