const { userModel, candidateModel } = require("../Model/candidateModel");

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
    if (!req.body.username.firstname) {
      res.status(401).json("First name is required");
      return;
    } else if (!req.body.username.lastname) {
      res.status(401).json("Last name is required");
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
  const isAlready = await candidateModel.findOne({ email: req.body.email });

  try {
    if (!req.body.organization && !req.body.username) {
      return res.status(401).json("Please enter username or organziation name");
    }
    if (req.body.username) {
      if (!req.body.username.firstname) {
        res.status(401).json("First name is required");
        return;
      } else if (!req.body.username.lastname) {
        res.status(401).json("Last name is required");
        return;
      }
    }
    next();
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json({ errors });
  }
};

exports.loginCheck = async (req, res, next) => {
  const user = await candidateModel.findOne({ email: req.body.email });
  try {
    if (user && user.emailConfirmed) {
      next();
    } else {
      res.status(401).send({ message: "Email not found" });
    }
  } catch (err) {
    console.log(err);
  }
};
