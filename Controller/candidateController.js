const { redirect } = require("react-router-dom");
const { userModel, candidateModel } = require("../Model/candidateModel");
const { sendValidation, sendToEmail } = require("../functions/sendEmail");
const { confirmEmail, oneTimePassword } = require("./tokenGenerator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getCandidates = async (req, res) => {
  const result = await candidateModel.find({});
  res.send(result);
};
exports.getCandidate = async (req, res) => {
  const result = await candidateModel.findById(req.params.id);
  res.send(result);
};

exports.createCandidate = async (req, res) => {
  try {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      roles: req.body.roles,
    };
    const user = await new candidateModel(newUser).save();
    const confirmToken = confirmEmail(user);
    console.log(confirmToken);
    return res.send({ confirmationToken: confirmToken });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.loginWithFacebook = async (req, res) => {
  const fbId = await candidateModel.findOne({
    facebookId: req.body.facebookId,
  });
  try {
    console.log(req.body);
    if (!fbId) {
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        facebookId: req.body.facebookId,
        photoUrl: req.body.image,
      };
      console.log(newUser);
      await new candidateModel(newUser).save();
      return res.send("Fb created and connected successfully");
    } else {
      return res.send("Fb connected successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.loginWithGoogle = async (req, res) => {
  const googleId = await candidateModel.findOne({
    googleId: req.body.googleId,
  });
  try {
    console.log(req.body);
    if (!googleId) {
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        googleId: req.body.googleId,
        photoUrl: req.body.image,
      };
      await new candidateModel(newUser).save();
      return res.send("Google created and connected successfully");
    } else {
      return res.send("Google connected successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.cVerifyCompleted = async (req, res) => {
  const confirmToken = req.params.id;

  console.log(req.headers, "headers");
  try {
    if (confirmToken) {
      jwt.verify(
        confirmToken,
        process.env.TOKEN_SECRET || "emailSecret123",
        async function (err, response) {
          if (err) return res.send(err);

          let user = await candidateModel.findById(response.id);
          console.log(user);
          user.emailConfirmed = true;
          await candidateModel.findByIdAndUpdate(response.id, user);
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

exports.deleteAllCandidates = async (req, res) => {
  res.send(await candidateModel.deleteMany());
};
