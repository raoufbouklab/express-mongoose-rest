const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.TOKEN_KEY, (error, decoded) => {
    if (error) return res.sendStatus(403);
    req.email = decoded.email;
    req.id = decoded.id;
    next();
  });
};

module.exports = verifyJWT;
