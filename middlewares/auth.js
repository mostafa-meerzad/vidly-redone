const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function (req, res, next) {
  // todo
  // take the token
  // verify it
  // send proper responses
  const token = req.header("x-user-token");
  if (!token) return res.status(401).send("access denied. no token provided");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded; // add a "user" property to the request object and can be accessed in the round handlers as "req.user._id" to get the _id from the provided jwt token
    next();
  } catch (err) {
    res.status(400).send("invalid token");
  }
};
