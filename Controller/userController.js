const { redirect } = require("react-router-dom");
const { userModel } = require("../Model/userModel");
const { sendValidation, sendToEmail } = require("../functions/sendEmail");
const { confirmEmail } = require("./tokenGenerator");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
    const result = await userModel.find({})
    res.send(result)
};
exports.getUser = async (req, res) => {
    const result = await userModel.findById(req.params.id);
    res.send(result);
};

exports.createUser = async (req, res) => {
    try {
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            roles: req.body.roles
        }
        const user = await new userModel(newUser).save();
        const confirmToken = confirmEmail(user)
        res.send({ confirmationToken: confirmToken })
    } catch (error) {
        return res.status(400).json(error);
    }
}
exports.login = async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email })

}
exports.confirmationCompleted = async (req, res) => {
    const confirmToken = req.params.token;
    console.log(req.headers, "headers");
    try {
        if (confirmToken) {
            jwt.verify(confirmToken, "emailSecret123", async function (err, response) {
                if (err) return res.send(err);

                let user = await userModel.findById(response.user);
                console.log(user)
                user.emailConfirmed = true;
                await userModel.findByIdAndUpdate(response.user, user);
                return res.send("Your email has confirmed.");
            });
        } else {
            res.status(404).send("No access token found");
        }
    } catch (err) {
        res.send(err);
    }

}
exports.deleteAllUser = async (req, res) => {
    res.send(await userModel.deleteMany());
};