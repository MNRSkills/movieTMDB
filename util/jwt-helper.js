const jwt = require("jsonwebtoken");

 const jwtTokens = ({ users_id, users_name, users_email }) => {
  const user = { users_id, users_name, users_email };
  const accessToken = jwt.sign(user, process.env.JWT_KEY, { expiresIn: "1hr" });
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH, { expiresIn: "5m" });
  return { accessToken, refreshToken };
};


module.exports = jwtTokens;