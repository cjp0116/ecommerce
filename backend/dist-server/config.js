"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SECRET = exports.PORT = exports.MONGODB_URL = exports.DEVELOPMENT_DB = exports.BCRYPT_WORK_FACTOR = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config("../config/dev.env");

const SECRET = process.env.JWT_SECRET || "prodKey";
exports.SECRET = SECRET;
const PORT = process.env.PORT || 3000;
exports.PORT = PORT;
const DEVELOPMENT_DB = process.env.DATABASE_URL || "mongodb://localhost/ecommerce";
exports.DEVELOPMENT_DB = DEVELOPMENT_DB;
const MONGODB_URL = process.env.NODE_ENV === "test" ? "mongodb://localhost/ecommerce_test" : DEVELOPMENT_DB;
exports.MONGODB_URL = MONGODB_URL;
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;
exports.BCRYPT_WORK_FACTOR = BCRYPT_WORK_FACTOR;