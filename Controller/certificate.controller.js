const { candidateModel } = require("../Model/candidateModel");
const { CertificateModel } = require("../Model/certificateModel");

exports.giveCertificate = async (req, res) => {
  const candidate = await candidateModel.findById(req.body.id);
  if (candidate) {
    const result = await new CertificateModel({ holder: candidate._id }).save();
    res.send(result);
  }
};
