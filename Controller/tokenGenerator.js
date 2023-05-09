const jwt = require("jsonwebtoken");
const {
  sendToMailConfiramtion,
  sendToMailOTP,
} = require("../functions/emailFunctions");
var uniqid = require("uniqid");

exports.userToken = (props) => {
  const accessToken = jwt.sign(
    {
      id: props.id,
      email: props.email,
      organization: props.organizationName,
      emailConfirmed: props.emailConfirmed,
      username: props.username,
      roles: props.roles,
      photoUrl: props.photoUrl,
    },
    process.env.TOKEN_SECRET || "sercretKey129",
    { expiresIn: "1d" }
  );
  return accessToken;
};

exports.oneTimePassword = (props) => {
  var rn = require("random-number");
  const bcrypt = require("bcrypt");

  var options = {
    min: 000001,
    max: 999999,
    integer: true,
  };
  const customId = rn(options);

  const validTokenId = jwt.sign(
    {
      _id: props.id,
      token: customId,
    },
    process.env.TOKEN_SECRET || "emailSecret123",
    { expiresIn: "5m" }
  );
  sendToMailOTP({ email: props.email, otp: customId });
  return validTokenId;
};

exports.confirmEmail = (props) => {
  const id = uniqid();
  var url;
  const port = process.env.PORT || 9000;
  const emailConfirm = jwt.sign(
    {
      id: props.id,
    },
    process.env.TOKEN_SECRET || "emailSecret123",
    {
      expiresIn: "8m",
    }
  );
  if (props.roles.recruiter || props.roles.admin || props.roles.company) {
    url = `http://localhost:${port}/confirmation/${emailConfirm}`;
  } else if (props.roles.candidate) {
    url = `http://localhost:${port}/confirmation/${emailConfirm}`;
  }

  const dispatch = {
    email: props.email,
    name: props.username ? props.username : props.fullname,
    company: props.companyName,
    id: id,
    url: url,
  };
  sendToMailConfiramtion(dispatch);

  return emailConfirm;
};
