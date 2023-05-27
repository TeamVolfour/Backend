const jwt = require("jsonwebtoken");
const {
  sendToMailConfiramtion,
  sendToMailOTP,
} = require("../functions/emailFunctions");
var uniqid = require("uniqid");

exports.userToken = (props) => {
  console.log(props)
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

exports.oneTimePassword = async (props) => {
  var rn = require("random-number");

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
    { expiresIn: "15m" }
  );
  await sendToMailOTP({ email: props.email, otp: customId });
  return validTokenId;
};

exports.confirmEmail = async (props) => {
  const id = uniqid();
  var url;
  const port = process.env.PORT || 9000;
  const emailConfirm = jwt.sign(
    {
      id: props.id,
      roles: props.roles
    },
    process.env.TOKEN_SECRET || "emailSecret123",
    {
      expiresIn: "15m",
    }
  );
  if (props.roles.recruiter || props.roles.admin || props.roles.company) {
    url = `https://volfour-be.vercel.app/recruiter/confirmation/${emailConfirm}`;
  } else if (props.roles.candidate) {
    url = `https://volfour-be.vercel.app/candidate/confirmation/${emailConfirm}`;
  }

  const dispatch = {
    email: props.email,
    fullname: {
      firstname: props.fullname.firstname,
      lastname: props.fullname.lastname
    },
    companyName: props.companyName,
    id: id,
    url: url,
  };
  await sendToMailConfiramtion(dispatch);

  return emailConfirm;
};
