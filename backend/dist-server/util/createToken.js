"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createToken = void 0;

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