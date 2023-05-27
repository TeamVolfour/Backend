const { sendValidation, sendToEmail } = require("../functions/emailFunctions");
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
      fullname: {
        firstname: req.body.fullname.firstname,
        lastname: req.body.fullname.lastname
      },

      email: req.body.email,
      roles: req.body.roles,
    };
    const user = await new recruiterModel(newUser).save();

    const confirmToken = await confirmEmail(user);

    return res.send({ confirmationToken: confirmToken });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.createCompany = async (req, res) => {
  console.log(req.body)
  const newCompany = {
    fullname: {
      firstname: req.body.fullname.firstname,
      lastname: req.body.fullname.lastname,
    },
    companyName: req.body.company,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    roles: req.body.roles,
  };
  const company = await new recruiterModel(newCompany).save();

  const confirmToken = await confirmEmail(company);
  return res.send({ confirmationToken: confirmToken });
};
exports.rVerifyCompleted = async (req, res) => {
  const confirmToken = req.params.id;

  try {
    if (confirmToken) {
      jwt.verify(
        confirmToken,
        process.env.TOKEN_SECRET || "emailSecret123",
        async function (err, response) {
          if (err) return res.send(err);

          let user = await recruiterModel.findById(response.id);

          user.emailConfirmed = true;
          await recruiterModel.findByIdAndUpdate(response.id, user);
          return res.redirect(
            "https://volfour.vercel.app/confirmation/" + confirmToken
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

exports.signupWithGoogle = async (req, res) => {
  const googleId = await recruiterModel.findOne({
    googleId: req.body.googleId,
  });
  try {
    if (!googleId) {
      const newUser = {
        fullname: {
          firstname: req.body.fullname.firstname,
          lastname: req.body.fullname.lastname,
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

exports.signupWithFacebook = async (req, res) => {
  const fbId = await recruiterModel.findOne({
    facebookId: req.body.facebookId,
  });
  try {
    if (!fbId) {
      const newUser = {
        fullname: {
          firstname: req.body.fullname.firstname,
          lastname: req.body.fullname.lastname,
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


exports.updateRecruiter = async (req, res) => {
  const body = req.body
  const id = req.params.id
  try {
    const user = await recruiterModel.findById(id)
    user.fullname.firstname = body.firstname
    user.fullname.lastname = body.lastname
    // user.email = body.email
    user.phoneNumber = body.phoneNumber
    user.socialInformations.websiteUrl = body.websiteUrl
    user.socialInformations.facebook = body.facebook
    user.socialInformations.instagram = body.instagram
    user.socialInformations.twitter = body.twitter
    user.personalInformations = body.personalInformations
    user.location = body.location
    const result = await recruiterModel.findByIdAndUpdate(id, user)
    res.send(result)

  } catch (err) {
    res.send(err);

  }
}

exports.deleteAllRecruiter = async (req, res) => {
  res.send(await recruiterModel.deleteMany());
};

