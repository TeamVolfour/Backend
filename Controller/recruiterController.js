const { redirect } = require("react-router-dom");
const { userModel, candidateModel } = require("../Model/candidateModel");
const { sendValidation, sendToEmail } = require("../functions/sendEmail");
const { confirmEmail, userToken } = require("./tokenGenerator");
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
    // console.log(confirmToken);
    return res.send({ confirmationToken: confirmToken });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.rVerifyCompleted = async (req, res) => {
  const confirmToken = req.params.id;
  console.log(confirmToken);
  try {
    if (confirmToken) {
      jwt.verify(
        confirmToken,
        process.env.TOKEN_SECRET || "emailSecret123",
        async function (err, response) {
          if (err) return res.send(err);
          console.log(response, "resposne");
          let user = await recruiterModel.findById(response.id);
          console.log(user);
          user.emailConfirmed = true;
          await recruiterModel.findByIdAndUpdate(response.id, user);
          return res.redirect(
            "http://localhost:3000/confirmation/" + confirmToken
          );
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
