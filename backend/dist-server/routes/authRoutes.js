"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../models/User"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _ExpressError = require("../util/ExpressError");

var _createToken = require("../util/createToken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post("/register", async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = _cryptoJs.default.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }

    const user = await _User.default.create(req.body);
    if (!user) throw new _ExpressError.BadRequestError();
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const foundUser = await _User.default.findOne({
      username: req.body.username
    }).select("+password");
    if (!foundUser) throw new _ExpressError.NotFoundError();

    const hashedPassword = _cryptoJs.default.AES.decrypt(foundUser.password, process.env.PASS_SEC);

    const password = hashedPassword.toString(_cryptoJs.default.enc.Utf8);
    if (password !== req.body.password) throw new _ExpressError.BadRequestError();
    foundUser.password = undefined;
    const token = (0, _createToken.createToken)(foundUser);
    return res.status(200).json({
      foundUser,
      token
    });
  } catch (error) {
    return next(error);
  }
});
var _default = router;
exports.default = _default;