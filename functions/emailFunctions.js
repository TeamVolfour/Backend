const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const sendToMailConfiramtion = async (props) => {

  console.log(props)
  try {
    var transporter = nodemailer.createTransport({
      port: 587,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extname: ".html",
        partialsDir: path.resolve("./views"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarOptions));
    console.log(__dirname);
    var mailOptions = {
      from: process.env.GMAIL,
      to: props.email,
      subject: "Volfour email confirmation",
      preheader: `Hi ${props.name}! Your email confirmation has been sent to you.`,
      template: "index",
      // html: `<p>Сайн байна уу?<p><p>Та <a href="${props.url}">энэ</a>  дээр дарж хаягаа баталгаажуулна уу<p>`,
      context: {
        url: props.url,
      },
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const sendToMailOTP = async (props) => {
  console.log(props, "otp mail");
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extname: ".html",
        partialsDir: path.resolve("./views2"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views2"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarOptions));

    var mailOptions = {
      from: process.env.GMAIL,
      to: props.email,
      subject: "Volfour email confirmation",
      template: "index",
      context: {
        password: props.otp,
      },
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.sendToMailConfiramtion = sendToMailConfiramtion;
exports.sendToMailOTP = sendToMailOTP;
