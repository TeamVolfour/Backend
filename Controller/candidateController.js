const { redirect } = require("react-router-dom");
const { userModel, candidateModel } = require("../Model/candidateModel");
const { sendValidation, sendToEmail } = require("../functions/emailFunctions");
const {
  confirmEmail,
  oneTimePassword,
  userToken,
} = require("./tokenGenerator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getCandidates = async (req, res) => {
  const result = await candidateModel.find({}).populate('certificates');
  res.send(result);
};
exports.getCandidate = async (req, res) => {
  const result = await candidateModel.findById(req.params.id).populate('certificates');
  res.send(result);
};

exports.createCandidate = async (req, res) => {
  console.log(req.body)
  try {
    const newUser = {
      fullname: {
        firstname: req.body.fullname.firstname,
        lastname: req.body.fullname.lastname
      },
      email: req.body.email,
      roles: req.body.roles,
    };
    const user = await new candidateModel(newUser).save();
    const confirmToken = confirmEmail(user);

    return res.send({ confirmationToken: confirmToken });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.signupWithFacebook = async (req, res) => {
  const fbId = await candidateModel.findOne({
    facebookId: req.body.facebookId,
  });
  try {
    if (!fbId) {
      const newUser = {
        fullname: {
          firstname: req.body.firstname,
          lastname: req.body.lastname
        },
        email: req.body.email,
        roles: req.body.role,
        facebookId: req.body.facebookId,
        photoUrl: req.body.image,
      };

      await new candidateModel(newUser).save();
      const accessToken = userToken(newUser);
      return res.send({ accessToken: accessToken });
    } else {
      const userDetail = await candidateModel.findOne({
        email: req.body.email,
      });

      const accessToken = userToken(userDetail);
      return res.send({ accessToken: accessToken });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.signupWithGoogle = async (req, res) => {
  const googleId = await candidateModel.findOne({
    googleId: req.body.googleId,
  });
  try {
    if (!googleId) {
      const newUser = {
        fullname: {
          firstname: req.body.firstname,
          lastname: req.body.lastname
        },
        email: req.body.email,
        googleId: req.body.googleId,
        photoUrl: req.body.image,
      };
      await new candidateModel(newUser).save();
      const userDetail = await candidateModel.findOne({
        email: req.body.email,
      });
      const accessToken = userToken(userDetail);
      return res.send({ accessToken: accessToken });
    } else {
      const userDetail = await candidateModel.findOne({
        email: req.body.email,
      });

      const accessToken = userToken(userDetail);
      return res.send({ accessToken: accessToken });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.cVerifyCompleted = async (req, res) => {
  const confirmToken = req.params.id;

  try {
    if (confirmToken) {
      jwt.verify(
        confirmToken,
        process.env.TOKEN_SECRET || "emailSecret123",
        async function (err, response) {
          if (err) return res.send(err);

          let user = await candidateModel.findById(response.id);

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
