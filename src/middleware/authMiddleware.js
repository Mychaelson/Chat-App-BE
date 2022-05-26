const { verifyToken } = require("../lib/jwt");

const authorizedLoginUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const verifiedToken = verifyToken(token);
    req.token = verifiedToken;
  } catch (err) {
    console.log(err);
    if (err.message == "jwt expired") {
      return res.status(419).json({
        message: "Your session has expired",
      });
    }

    return res.status(401).json({
      message: err.message,
    });
  }

  next();
};

module.exports = authorizedLoginUser;
