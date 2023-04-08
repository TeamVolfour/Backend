const { redirect } = require("react-router-dom");
const { userModel, candidateModel } = require("../Model/candidateModel");
const { sendValidation, sendToEmail } = require("../functions/sendEmail");
const { confirmEmail } = require("./tokenGenerator");
const jwt = require("jsonwebtoken");
const { recruiterModel } = require("../Model/recruiterModel");

exports.getRecruiters = async (req, res) => {
  const result = await recruiterModel.find({});
  res.send(result);
};
exports.getRecruiter = async (req, res) => {
  const result = await recruiterModel.findById(req.params.id);
  res.send(result);
};

exports.createRecruiter = async (req, res) => {
  try {
    const newUser = {
      username: req.body.username,
      organizationName: req.body.organization,
      email: req.body.email,
      roles: req.body.roles,
    };
    const user = await new recruiterModel(newUser).save();
    const confirmToken = confirmEmail(user);
    res.send({ confirmationToken: confirmToken });
  } catch (error) {
    return res.status(400).json(error);
  }
};
exports.loginAsRecruiter = async (req, res) => {
  const user = await recruiterModel.findOne({ email: req.body.email });
};
exports.confirmationCompleted = async (req, res) => {
  const confirmToken = req.params.token;
  console.log(req.headers, "headers");
  try {
    if (confirmToken) {
      jwt.verify(
        confirmToken,
        "emailSecret123",
        async function (err, response) {
          if (err) return res.send(err);

          let user = await recruiterModel.findById(response.user);
          console.log(user);
          user.emailConfirmed = true;
          await recruiterModel.findByIdAndUpdate(response.user, user);
          return res.send("Your email has confirmed.");
        }
      );
    } else {
      res.status(404).send("No access token found");
    }
  } catch (err) {
    res.send(err);
  }
};
exports.deleteAllRecruiter = async (req, res) => {
  res.send(await recruiterModel.deleteMany());
};
