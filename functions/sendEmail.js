const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");


const sendToMailConfiramtion = async (props) => {

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
                partialsDir: path.resolve('./views'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views'),
            extName: ".handlebars",
        };

        transporter.use("compile", hbs(handlebarOptions));

        var mailOptions = {
            from: process.env.GMAIL,
            to: props.email,
            subject: 'Volfour email confirmation',
            preheader: `Hi ${props.name}! Your email confirmation has been sent to you.`,
            template: "index",
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
        console.log(error)
    }
};

exports.sendToMailConfiramtion = sendToMailConfiramtion
