const { candidateModel } = require("../Model/candidateModel");
const { recruiterModel } = require("../Model/recruiterModel");

exports.facebookLoginCheck = async (req, res, next) => {
    const registeredEmail = await candidateModel.findOne({
        email: req.body.email,
    });
    const registeredEmail2 = await recruiterModel.findOne({
        email: req.body.email,
    });
    console.log(registeredEmail, "info");

    if (req.body.facebookId) {
        if (!registeredEmail && !registeredEmail2) {
            next();
        } else {
            if (registeredEmail.facebookId) {
                if (registeredEmail.facebookId == req.body.facebookId) {
                    next();
                }
            } else {
                return res.status(409).json("This email is already registered");
            }
        }
    } else {
        return res.status(401).json("Facebook login failed");
    }
};

exports.googleLoginCheck = async (req, res, next) => {
    const registeredEmail = await candidateModel.findOne({
        email: req.body.email,
    });
    const registeredEmail2 = await recruiterModel.findOne({
        email: req.body.email,
    });
    console.log(req.body, registeredEmail.googleId);
    if (req.body.googleId) {
        if (!registeredEmail && !registeredEmail2) {
            next();
        } else {
            if (registeredEmail.googleId) {
                if (registeredEmail.googleId == req.body.googleId) {
                    next();
                }
            } else {
                return res.status(409).json("This email is already registered");
            }
        }
    } else {
        return res.status(401).json("Google login failed");
    }
};


exports.facebookLoginCheck2 = async (req, res, next) => {
    const registeredEmail = await candidateModel.findOne({
        email: req.body.email,
    });
    const registeredEmail2 = await recruiterModel.findOne({
        email: req.body.email,
    });
    console.log(registeredEmail2, "info");

    if (req.body.facebookId) {
        if (!registeredEmail && !registeredEmail2) {
            next();
        } else {
            if (registeredEmai2l.facebookId) {
                if (registeredEmail2.facebookId == req.body.facebookId) {
                    next();
                }
            } else {
                return res.status(409).json("This email is already registered");
            }
        }
    } else {
        return res.status(401).json("Facebook login failed");
    }
};

exports.googleLoginCheck2 = async (req, res, next) => {
    const registeredEmail = await candidateModel.findOne({
        email: req.body.email,
    });
    const registeredEmail2 = await recruiterModel.findOne({
        email: req.body.email,
    });
    // console.log(req.body, registeredEmail2.googleId);
    if (req.body.googleId) {
        if (!registeredEmail && !registeredEmail2) {
            next();
        } else {
            if (registeredEmail2.googleId) {
                if (registeredEmail2.googleId == req.body.googleId) {
                    next();
                }
            } else {
                return res.status(409).json("This email is already registered");
            }
        }
    } else {
        return res.status(401).json("Google login failed");
    }
};
