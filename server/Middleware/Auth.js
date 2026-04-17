const jwt = require("jsonwebtoken")
const SECRET_KEY = "product-crud"

const authuser = (req, res, next) => {
  try {
    const usertoken = req.header("auth-token");

    if (!usertoken) {
      return res.status(401).json({
        message: "No token, unauthorized",
      });
    }

    const userinfo = jwt.verify(usertoken, "product-crud");

    req.userid = userinfo.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authuser