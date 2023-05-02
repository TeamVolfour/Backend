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
  const alreadyUsername = await candidateModel.findOne({
    username: req.body.username,
  });
  const registeredEmail = await candidateModel.findOne({
    email: req.body.email,
  });
  const alreadyUsernameRec = await recruiterModel.findOne({
    username: req.body.username,
  });
  console.log(req.body);
  try {
    if (!req.body.email) {
      return res.status(401).json("Email is required");
    } else if (!req.body.username) {
      return res.status(401).json("Username is required");
    } else if (alreadyUsername || alreadyUsernameRec) {
      res.status(409).send("That username is already registered");
      return;
    } else if (registeredEmail) {
      if (registeredEmail.emailConfirmed == false) {
        console.log(registeredEmail);
        await candidateModel.findOneAndDelete({
          email: registeredEmail.email,
        });
        return next();
      }
      return res.status(409).send("That email is already registered");
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

  try {
    if (!req.body.full.firstname) {
      return res.status(401).json("Firstname is required");
    } else if (!req.body.full.lastname) {
      return res.status(401).json("Lastname is required");
    } else if (!req.body.email) {
      return res.status(401).json("Email is required");
    } else if (registeredEmail) {
      return res.status(409).send("That email is already registered");
    } else if (registeredEmail2) {
      if (registeredEmail2.emailConfirmed == false) {
        console.log(registeredEmail2);
        await recruiterModel.findOneAndDelete({
          email: registeredEmail2.email,
        });
        return next();
      }
      return res.status(409).send("That email is already registered");
    } else if (registeredOrganization) {
      return res.status(409).send("That organization is already registered");
    }

    next();
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

exports.signUpCheckCompany = async (req, res, next) => {
  const registeredBussinesEmail = await recruiterModel.findOne({
    email: req.body.email,
  });

  try {
    if (!req.body.email) {
      return res.status(401).json("Email is required");
    } else if (!req.body.fullname.firstname) {
      return res.status(401).json("Firstname is required");
    } else if (!req.body.fullname.lastname) {
      return res.status(401).json("Lastname is required");
    } else if (!req.body.phoneNumber) {
      return res.status(401).json("Phone number is required");
    } else if (!req.body.companyName) {
      return res.status(401).json("Company name is required");
    } else if (registeredBussinesEmail) {
      if (registeredEmail.emailConfirmed == false) {
        console.log(registeredEmail);
        await candidateModel.findOneAndDelete({
          email: registeredEmail.email,
        });
        return next();
      }
      return res.status(409).send("That email is already registered");
    } else if (
      req.body.email.includes("gmail") ||
      req.body.email.includes("yahoo") ||
      req.body.email.includes("outlook")
    ) {
      return res.status(401).json("Please use bussines email");
    }

    next();
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.loginCheck = async (req, res, next) => {
  const candidate = await candidateModel.findOne({ email: req.body.email });
  const recruiter = await recruiterModel.findOne({ email: req.body.email });
  try {
    if (!req.body.email) {
      return res
        .status(401)
        .send({ message: "Please enter your email address" });
    }
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
