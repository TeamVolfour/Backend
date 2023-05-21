const { candidateModel } = require("../Model/candidateModel");
const { recruiterModel } = require("../Model/recruiterModel");
const { oneTimePassword, userToken } = require("./tokenGenerator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const candidate = await candidateModel.findOne({ email: req.body.email });
  const recruiter = await recruiterModel.findOne({ email: req.body.email });
  try {
    if (candidate) {
      const otpToken = oneTimePassword({
        id: candidate._id,
        email: candidate.email,
      });
      res.json({ otpToken: otpToken });
    }

    if (recruiter) {
      const otpToken = oneTimePassword({
        id: recruiter._id,
        email: recruiter.email,
      });
      res.json({ otpToken: otpToken });
    }
  } catch (error) {
    console.log(error);
  }
};




exports.otpCheck = async (req, res) => {
  const accessToken = req.headers.otptoken;


  try {
    if (accessToken) {
      jwt.verify(
        accessToken,
        process.env.TOKEN_SECRET || "emailSecret123",
        async function (err, response) {
          if (err) return res.send(err);
          if (req.body.otp == response.token) {
            console.log("matched");

            const candidate = await candidateModel.findById({
              _id: response._id,
            });
            const recruiter = await recruiterModel.findById({
              _id: response._id,
            });

            if (candidate) {
              const token = userToken(candidate);
              return res.status(200).json({ accessToken: token });
            }
            if (recruiter) {
              const token = userToken(recruiter);
              return res.status(200).json({ accessToken: token });
            }
          } else {
            res.status(403).send("Wrong one time password");
          }
        }
      );
    } else {
      res.status(404).send("No token found");
    }
  } catch (err) {
    res.send(err);
  }
};

exports.loginWithGoogle = async (req, res) => {
  const googleId = await candidateModel.findOne({
    googleId: req.body.googleId,
  });
  const candidate = await candidateModel.findOne({
    email: req.body.email,
  });
  const googleId2 = await recruiterModel.findOne({
    googleId: req.body.googleId,
  });

  try {

    if (candidate) {
      if (!googleId) {
        return res.status(401).send('This account not found')

      } else {
        const userDetail = await candidateModel.findOne({
          email: req.body.email,
        });

        const accessToken = userToken(userDetail);
        return res.send({ accessToken: accessToken });
      }
    } else {
      if (!googleId2) {
        return res.status(401).send('This account not found')

        const userDetail = await recruiterModel.findOne({
          email: req.body.email,
        });

        const accessToken = userToken(userDetail);
        return res.send({ accessToken: accessToken });
      }
    }

  } catch (error) {
    console.log(error);
  }
};

exports.loginWithFacebook = async (req, res) => {
  const facebookId = await candidateModel.findOne({
    facebookId: req.body.facebookId,
  });

  const candidate = await candidateModel.findOne({
    email: req.body.email,
  });


  const facebookId2 = await recruiterModel.findOne({
    facebookId: req.body.facebookId,
  });

  try {

    if (candidate) {
      if (!facebookId) {
        return res.status(401).send('This account not found')
      } else {
        const userDetail = await candidateModel.findOne({
          email: req.body.email,
        });

        const accessToken = userToken(userDetail);
        return res.send({ accessToken: accessToken });
      }
    } else {
      if (!facebookId2) {
        return res.status(401).send('This account not found')

      } else {
        const userDetail = await recruiterModel.findOne({
          email: req.body.email,
        });

        const accessToken = userToken(userDetail);
        return res.send({ accessToken: accessToken });
      }
    }

  } catch (error) {
    console.log(error);
  }
};

exports.tokenResponse = async (req, res) => {

  const recruiter = await recruiterModel.findById(req.body.id);
  const candidate = await candidateModel.findById(req.body.id);

  try {
    if (recruiter) {
      const token = userToken({
        email: recruiter.email,
        fullname: {
          firstname: recruiter.fullname.firstname,
          lastname: recruiter.fullname.lastname
        },
        companyName: recruiter.companyName,
        roles: recruiter.roles,
        photoUrl: recruiter.photoUrl,
        id: recruiter._id,
      });
      res.send({ accessToken: token });
    } else {
      const token = userToken({
        email: candidate.email,
        fullname: {
          firstname: candidate.fullname.firstname,
          lastname: candidate.fullname.lastname
        },
        roles: candidate.roles,
        photoUrl: candidate.photoUrl,
        id: candidate._id,
      });
      res.send({ accessToken: token });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
