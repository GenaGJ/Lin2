require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtConfig = require('../middleware/configJWT');

// функция генирации токена, принимает в себя полезную нагрузку
const generateTokens = (payload) => ({
  accessToken: jwt.sign(payload, process.env.SESSION_SECRETA, {
    expiresIn: jwtConfig.access.expiresIn,
  }),
  refreshToken: jwt.sign(payload, process.env.SESSION_SECRETB, {
    expiresIn: jwtConfig.refresh.expiresIn,
  }),
});

module.exports = generateTokens;
