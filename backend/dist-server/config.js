"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SECRET = exports.PORT = exports.MONGODB_URL = exports.DEVELOPMENT_DB = exports.BCRYPT_WORK_FACTOR = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config("../config/dev.env");

var SECRET = process.env.JWT_SECRET || "prodKey";
exports.SECRET = SECRET;
var PORT = process.env.PORT || 3000;
exports.PORT = PORT;
var DEVELOPMENT_DB = process.env.DATABASE_URL || "mongodb://localhost/ecommerce";
exports.DEVELOPMENT_DB = DEVELOPMENT_DB;
var MONGODB_URL = process.env.NODE_ENV === "test" ? "mongodb://localhost/ecommerce_test" : DEVELOPMENT_DB;
exports.MONGODB_URL = MONGODB_URL;
var BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;
exports.BCRYPT_WORK_FACTOR = BCRYPT_WORK_FACTOR;