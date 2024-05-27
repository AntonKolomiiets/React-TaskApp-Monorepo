const { jwtVerify } = require("jose");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const { payload } = await jwtVerify(token, publicKey);
    req.user = payload; // Attach user info to request
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    res.sendStatus(403); // Invalid token
  }
};

module.exports = authenticateToken;
