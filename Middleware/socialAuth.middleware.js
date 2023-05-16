const { candidateModel } = require("../Model/candidateModel");
const { recruiterModel } = require("../Model/recruiterModel");




exports.facebookLoginCheck = async (req, res, next) => {
    const registeredEmail = await candidateModel.findOne({
        email: req.body.email,
    });
    const registeredEmail2 = await recruiterModel.findOne({
        email: req.body.email,
    });

    if (req.body.facebookId) {
        if (!registeredEmail && !registeredEmail2) {
            return res.status(409).json("This account not found");

        } else {
            if (registeredEmail) {
                if (registeredEmail.facebookId) {
                    if (registeredEmail.facebookId == req.body.facebookId) {
                        next();
                    }
                } else {
                    return res.status(409).json("This email is already registered");
                }
            }
            if (registeredEmail2) {
                if (registeredEmail2.facebookId) {

                    if (registeredEmail2.facebookId == req.body.facebookId) {
                        next();
                    }
                } else {
                    return res.status(409).json("This email is already registered");
                }
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

    if (req.body.googleId) {
        if (!registeredEmail && !registeredEmail2) {
            next();
        } else {
            if (registeredEmail) {
                if (registeredEmail.googleId) {
                    if (registeredEmail.googleId == req.body.googleId) {
                        next();
                    }
                } else {
                    return res.status(409).json("This email is already registered");
                }
            }
            if (registeredEmail2) {
                if (registeredEmail2.googleId) {
                    if (registeredEmail2.googleId == req.body.googleId) {
                        next();
                    }
                } else {
                    return res.status(409).json("This email is already registered");
                }
            }

        }
    } else {
        return res.status(401).json("Google login failed");
    }
};






exports.facebookSignupCheck = async (req, res, next) => {
    const registeredEmail = await candidateModel.findOne({
        email: req.body.email,
    });
    const registeredEmail2 = await recruiterModel.findOne({
        email: req.body.email,
    });
    console.log('aaaaaaaa')
    console.log(registeredEmail, registeredEmail2)
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

exports.googleSignupCheck = async (req, res, next) => {
    const registeredEmail = await candidateModel.findOne({
        email: req.body.email,
    });
    const registeredEmail2 = await recruiterModel.findOne({
        email: req.body.email,
    });

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







exports.facebookSignupCheck2 = async (req, res, next) => {
    const registeredEmail = await candidateModel.findOne({
        email: req.body.email,
    });
    const registeredEmail2 = await recruiterModel.findOne({
        email: req.body.email,
    });


    if (req.body.facebookId) {
        if (!registeredEmail && !registeredEmail2) {
            next();
        } else {
            if (registeredEmail2.facebookId) {
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

exports.googleSignupCheck2 = async (req, res, next) => {
    const registeredEmail = await candidateModel.findOne({
        email: req.body.email,
    });
    const registeredEmail2 = await recruiterModel.findOne({
        email: req.body.email,
    });

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
