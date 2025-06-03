const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function GetAccessToken({ email, user }) {
  const AccessToken = jwt.sign({ email, user }, process.env.ACCESS_TOKEN, {
    expiresIn: "15m",
  });

  return AccessToken;
}

function GetRefreshToken({ email, user }) {
  const RefreshToken = jwt.sign({ email, user }, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  return RefreshToken;
}

module.exports = {
  GetAccessToken,
  GetRefreshToken,
};
