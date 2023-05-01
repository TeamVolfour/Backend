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

exports.createCompany = async (req, res) => {
  try {
    const newCompany = {
      fullname: {
        firstname: req.body.firstname,
        lastname: req.body.lastname
      },
      companyName: req.body.company,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      roles: req.body.roles,

    };
    const company = await new recruiterModel(newCompany).save();

    const confirmToken = confirmEmail(company)
    return res.send({ confirmationToken: confirmToken });
  } catch (err) {
    return res.status(400).json(err);
  }
}
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
            "https://volfour-rayethedev-volfour-fe.vercel.app/confirmation/" +
              confirmToken
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

exports.loginWithGoogle = async (req, res) => {
  const googleId = await recruiterModel.findOne({
    googleId: req.body.googleId,
  });
  try {
    console.log(req.body);
    if (!googleId) {
      const newUser = {
        fullname: {
          firstname: req.body.fullname.firstname,
          lastname: req.body.fullname.lastname

        },
        email: req.body.email,
        googleId: req.body.googleId,
        photoUrl: req.body.image,
      };
      await new recruiterModel(newUser).save();
      const userDetail = await recruiterModel.findOne({
        email: req.body.email,
      });
      const accessToken = userToken(userDetail);
      return res.send({ accessToken: accessToken });
    } else {
      const userDetail = await recruiterModel.findOne({
        email: req.body.email,
      });

      const accessToken = userToken(userDetail);
      return res.send({ accessToken: accessToken });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.loginWithFacebook = async (req, res) => {
  const fbId = await recruiterModel.findOne({
    facebookId: req.body.facebookId,
  });
  try {
    console.log(req.body);
    if (!fbId) {
      const newUser = {
        fullname: {
          firstname: req.body.fullname.firstname,
          lastname: req.body.fullname.lastname

        },
        email: req.body.email,
        facebookId: req.body.facebookId,
        photoUrl: req.body.image,
      };
      await new recruiterModel(newUser).save();
      const userDetail = await recruiterModel.findOne({
        email: req.body.email,
      });
      const accessToken = userToken(userDetail);
      return res.send({ accessToken: accessToken });
    } else {
      const userDetail = await recruiterModel.findOne({
        email: req.body.email,
      });

      const accessToken = userToken(userDetail);
      return res.send({ accessToken: accessToken });
    }
  } catch (error) {
    console.log(error);
  }
};








exports.deleteAllRecruiter = async (req, res) => {
  res.send(await recruiterModel.deleteMany());
};
