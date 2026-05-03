const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

// console.log("SECRET (MIDDLEWARE):", SECRET_KEY);

const authuser = (req, res, next) => {
  try {
    const usertoken = req.header("auth-token");

    if (!usertoken) {
      return res.status(401).json({
        message: "No token, unauthorized",
      });
    }
    
    const userinfo = jwt.verify(usertoken, SECRET_KEY);

    req.userid = userinfo.id;
    req.role = userinfo.role;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = {authuser, adminMiddleware};
