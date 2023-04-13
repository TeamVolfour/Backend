const jwt = require("jsonwebtoken");
const {
  sendToMailConfiramtion,
  sendToMailOTP,
} = require("../functions/sendEmail");
var uniqid = require("uniqid");

exports.userToken = (props) => {
  const accessToken = jwt.sign(
    {
      email: props.email,
      emailConfirmed: props.emailConfirmed,
      username: { first: props.username.first, last: props.username.last },
      roles: props.roles,
    },
    process.env.TOKEN_SECRET || "sercretKey129",
    { expiresIn: "2m" }
  );
  return accessToken;
};

exports.oneTimePassword = (props) => {
  console.log(props);
  var rn = require("random-number");
  const bcrypt = require("bcrypt");

  var options = {
    min: 0000001,
    max: 9999999,
    integer: true,
  };
  const customId = rn(options);
  console.log(customId);

  const salt = bcrypt.genSaltSync(1);
  const hashedToken = bcrypt.hashSync(String(customId), salt);
  console.log(hashedToken, "d");
  const validTokenId = jwt.sign(
    {
      _id: props.id,
      token: hashedToken,
    },
    process.env.TOKEN_SECRET || "otpSecret123",
    { expiresIn: "5m" }
  );
  sendToMailOTP({ email: props.email, otp: customId });
  return validTokenId;
};

exports.confirmEmail = (props) => {
  // async email
  const id = uniqid();
  var url;
  const port = process.env.PORT || 9000;
  const emailConfirm = jwt.sign(
    {
      id: props.id,
    },
    process.env.TOKEN_SECRET || "emailSecret123",
    {
      expiresIn: "5m",
    }
  );
  if (props.roles.recruiter) {
    url = `http://localhost:${port}/recruiter/confirmation/${emailConfirm}`;
  } else if (props.roles.candidate) {
    url = `http://localhost:${port}/candidate/confirmation/${emailConfirm}`;
  }

  const dispatch = {
    email: props.email,
    name: props.username.firstname,
    id: id,
    url: url,
  };
  sendToMailConfiramtion(dispatch);

  return emailConfirm;
};
