const { Schema, model, Types, SchemaTypes } = require("mongoose");
const Certificate = new Schema({
  holderName: String,
  createdAt: { type: Date, default: Date.now() },
  jobId: { type: Schema.Types.ObjectId, ref: "JobPost" }
});

const CertificateModel = model("Certificate", Certificate);
module.exports = { CertificateModel };
