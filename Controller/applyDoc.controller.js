const { ApplyDocModel } = require("../Model/applyDocument.model");

exports.getApplyDoc = async (req, res) => {
  try {
    const doc = await ApplyDocModel.find({});
    res.send(doc);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.createApplyDoc = async (req, res) => {
  console.log(req.body);
  const newDoc = {
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    name: req.body.name,
    coverLetter: req.body.letter,
    userId: req.body.userId,
  };
  const doc = await new ApplyDocModel(newDoc).save();
  res.send(doc);
};

exports.deleteApplyDoc = async (req, res) => {
  res.send(await ApplyDocModel.deleteMany());
};
