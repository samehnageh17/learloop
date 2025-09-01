const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "You must login first" });
    }

    const decoded = await promisify(jwt.verify)(
      authorization,
      process.env.JWT_SECRET
    );
    req.role = decoded.role;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};
