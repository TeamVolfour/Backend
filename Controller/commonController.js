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
  console.log(req.headers.otptoken, "headers");
  try {
    if (accessToken) {
      console.log('what')
      jwt.verify(
        accessToken,
        process.env.TOKEN_SECRET || "emailsecret123",
        async function (err, response) {
          if (err) return res.send(err);
          const isMatched = bcrypt.compareSync(req.body.otp, response.token);

          if (isMatched) {
            console.log('matched')
            console.log(response._id)
            const candidate = await candidateModel.findById({
              _id: response._id,
            });
            const recruiter = await recruiterModel.findById({
              _id: response._id,
            });
            console.log(candidate, recruiter);
            if (candidate) {
              const token = userToken(candidate);
              return res.status(200).json({ accessToke: token });
            }
            if (recruiter) {
              const token = userToken(recruiter);
              return res.status(200).json({ accessToke: token });
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
