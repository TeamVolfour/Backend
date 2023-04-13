const { userToken } = require("../Controller/tokenGenerator");
const { userModel, candidateModel } = require("../Model/candidateModel");
const { recruiterModel } = require("../Model/recruiterModel");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "" };
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  console.log(errors);
  return errors;
};

exports.signUpCheckCandidate = async (req, res, next) => {
  const isAlready = await candidateModel.findOne({ email: req.body.email });

  console.log(req.body);
  try {
    if (!req.body.username) {
      res.status(401).json("First name is required");
      return;
    } else if (isAlready) {
      res.status(400).send("That email is already registered");
      return;
    }
    next();
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json({ errors });
  }
};

exports.signUpCheckRecruiter = async (req, res, next) => {
  const registeredEmail = await candidateModel.findOne({
    email: req.body.email,
  });
  const registeredEmail2 = await recruiterModel.findOne({
    email: req.body.email,
  });
  const registeredOrganization = await recruiterModel.findOne({
    organizationName: req.body.organization,
  });

  try {
    if (!req.body.organization && !req.body.username) {
      if (!req.body.username) {
        return res.status(401).json("Username is required");
      }
      if (!req.body.organization) {
        return res
          .status(401)
          .json("Please enter username or organziation name");
      }
    } else if (registeredEmail || registeredEmail2) {
      return res.status(401).send("That email is already registered");
    } else if (registeredOrganization) {
      return res.status(401).send("That organization is already registered");
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Failed" });
  }
};
exports.facebookLoginCheck = async (req, res, next) => {
  const registeredEmail = await candidateModel.findOne({
    email: req.body.email,
  });
  console.log(registeredEmail);

  if (req.body.facebookId) {
    if (registeredEmail.facebookId == req.body.facebookId) {
      next();
    } else {
      return res.status(401).json("This email is already registered");
    }
  } else {
    return res.send(401).json("Facebook login failed");
  }
};

exports.otpCheck = async (req, res, next) => {
  const accessToken = req.headers.otptoken;
  console.log(req.headers.otptoken, "headers");
  try {
    if (accessToken) {
      jwt.verify(
        accessToken,
        process.env.TOKEN_SECRET || "otpSecret123",
        async function (err, response) {
          if (err) return res.send(err);
          const isMatched = bcrypt.compareSync(req.body.otp, response.token);

          if (isMatched) {
            const candidate = await candidateModel.findById({
              _id: response.token._id,
            });
            const recruiter = await candidateModel.findById({
              _id: response.token._id,
            });

            if (candidate) {
              const token = userToken(candidate);
              return res.status(200).json(token);
            }
            if (recruiter) {
              const token = userToken(recruiter);
              return res.status(200).json(token);
            }
          } else {
            res.status(404).send("Wrong one time password");
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

exports.loginCheck = async (req, res, next) => {
  const candidate = await candidateModel.findOne({ email: req.body.email });
  const recruiter = await recruiterModel.findOne({ email: req.body.email });
  try {
    if (
      (candidate && candidate.emailConfirmed) ||
      (recruiter && recruiter.emailConfirmed)
    ) {
      next();
    } else {
      res.status(401).send({ message: "Email not found" });
    }
  } catch (err) {
    console.log(err);
  }
};
