const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");


const sendToMailConfiramtion = async (props) => {

  try {
    var transporter = nodemailer.createTransport({
      port: 587,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
      secure: false
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
    // await transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });
    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });

  } catch (error) {
    console.log(error, 'nodemailer');
  }
};

const sendToMailOTP = async (props) => {

  try {

    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
      secure: true

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

    // await transporter.sendMail(mailOptions, function (error, info) {
    //   console.log('transporter ')
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });


    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });
    // console.log(props.email, 'user email')
    await new Promise((resolve, reject) => {

      // send mail
      transporter.sendMail(mailOptions, (err, info) => {
        console.log('email')
        if (err) {
          console.error(err, 'nodemailer err');
           reject(err);
         } else {
           console.log(info);
           console.log('Promised orj bna')
           resolve(info);
         }
       });
    });

  } catch (error) {
    console.log(error, 'nodemailer');
  }
};

exports.sendToMailConfiramtion = sendToMailConfiramtion;
exports.sendToMailOTP = sendToMailOTP;
