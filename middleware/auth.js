const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    return res.status(400).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Your JWT is Invalid");
  }
  return next();
};

module.exports = verifyToken;