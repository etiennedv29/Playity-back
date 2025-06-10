const { checkToken } = require("../repository/users");

const checkSecurity = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "missing token" });
  }

  try {
    const isTokenValid = await checkToken(token);
    if (!isTokenValid) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    next();
  } catch (err) {
    return res.status(403).json({ error: "Unauthorized" });
  }
};

module.exports = { checkSecurity };
