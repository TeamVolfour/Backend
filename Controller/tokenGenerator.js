const jwt = require("jsonwebtoken");
const { sendToMailConfiramtion } = require("../functions/sendEmail");

exports.userToken = (props) => {

    const accessToken = jwt.sign(
        {
            email: props.email,
            password: props.password,
            isVerified: props.isVerified,
            username: { first: props.username.first, last: props.username.last },
            roles: props.roles,
        },
        process.env.ACCESS_TOKEN_SECRET || "sercretKey129",
        { expiresIn: "2m" }
    );
    return accessToken;
}

exports.oneTimePassword = (props) => {
    console.log(props);
    var rn = require("random-number");
    const bcrypt = require("bcrypt");

    var options = {
        min: 000001,
        max: 999999,
        integer: true,
    };
    const customId = rn(options);
    console.log(customId);

    const salt = bcrypt.genSaltSync(1);
    const hashedToken = bcrypt.hashSync(String(customId), salt);
    console.log(hashedToken, "d");
    const validTokenId = jwt.sign(
        {
            _id: props._id,
            token: hashedToken,
        },
        "defaultSecure",
        { expiresIn: "5m" }
    );
    sendValidation({ email: props.email, token: customId });
    return validTokenId;
}

exports.confirmEmail = (props) => {
    // async email
    console.log(props, 'confirmEmail')
    try {
        jwt.sign(
            {
                user: props.id,
            },
            'emailSecret123',
            {
                expiresIn: '5m',
            },
            (err, emailToken) => {
                const url = `http://localhost:4040/confirmation/${emailToken}`;
                const dispatch = { email: props.email, name: props.username.firstname, url: url }
                sendToMailConfiramtion(dispatch)
                return emailToken
            },
        );

    } catch (err) {
        console.log(err)
    }


}