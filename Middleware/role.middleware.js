const jwt = require("jsonwebtoken");
const { recruiterModel } = require("../Model/recruiterModel");

exports.roleMiddleware = (...allowedRoles) => {
  return async (req, res, next) => {
    const token = req.headers.authorization ?? null;
    // console.log(token)
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }
    try {
      const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await recruiterModel.findById(decoded.id);
      if (!user) return res.status(401).send("Access denied. Invalid token.");
      const rolesArray = [...allowedRoles];
      const result = rolesArray.some((role) => {
        return role === user?.roles?.recruiter;
      });
      // const result = user.roles
      //   .map((role) => rolesArray.includes(role))
      // .find((val) => val === true);

      // if (!user.roles.includes(allowedRoles)) return res.status(403).send('Access denied. Forbidden.');
      if (!result) return res.status(403).send("Access denied. Forbidden.");

      next();
    } catch (err) {
      console.log(err);
      res.status(400).send("Invalid token.");
    }
  };
};
