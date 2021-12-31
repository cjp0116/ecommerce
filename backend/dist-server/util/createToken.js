"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createToken = exports.createSendToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createToken = user => {
  const token = _jsonwebtoken.default.sign({
    id: user._id,
    username: user.username,
    isAdmin: user.isAdmin || false
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  return token;
};

exports.createToken = createToken;

const createSendToken = (user, statusCode, req, res) => {
  const token = createToken(user);
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    user
  });
};

exports.createSendToken = createSendToken;