const { candidateModel } = require("../Model/candidateModel");
const { CertificateModel } = require("../Model/certificateModel");

exports.giveCertificate = async (req, res) => {
  const candidate = await candidateModel.findById(req.body.id);
  if (candidate) {
    const certificate = await new CertificateModel({ holder: candidate._id, jobId: req.body.jobId, holderName: candidate.username }).save();

    candidate.certificates.push(certificate._id)
    const result = await candidateModel.findByIdAndUpdate(candidate._id, candidate)
    res.send(result);
  }
};


exports.getCertificate = async (req, res) => {
  try {

    const certi = await CertificateModel.findById(req.params.id).populate("jobId")

    res.send(certi)
  } catch (err) {
    console.log(err)
  }

}