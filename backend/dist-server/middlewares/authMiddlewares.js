"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.ensureLoggedInAndNotExpired = exports.ensureAdminOrCorrectUser = exports.ensureAdmin = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _ExpressError = require("../util/ExpressError");

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.token;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      const user = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);

      res.locals.user = user;
    }

    return next();
  } catch (error) {
    return next();
  }
};

exports.verifyToken = verifyToken;

const ensureLoggedInAndNotExpired = async (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!user) throw new _ExpressError.UnauthorizedError();
    const currentUser = await _User.default.findById(user.id);
    if (!currentUser) throw new _ExpressError.UnauthorizedError();
    req.user = currentUser;
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.ensureLoggedInAndNotExpired = ensureLoggedInAndNotExpired;

const ensureAdmin = (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!user && !user.isAdmin) throw new _ExpressError.UnauthorizedError();
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.ensureAdmin = ensureAdmin;

const ensureAdminOrCorrectUser = (req, res, next) => {
  try {
    const user = res.locals.user;

    if (!(user && (user.isAdmin || user.id === req.params.id))) {
      throw new _ExpressError.UnauthorizedError();
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

exports.ensureAdminOrCorrectUser = ensureAdminOrCorrectUser;