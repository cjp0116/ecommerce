"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].set("debug", true);

_mongoose["default"].connection.on("error", function (e) {
  console.error("".concat(e.message, " is Mongod not running?"));
});

_mongoose["default"].connection.on('disconnected', function () {
  console.log('mongo disconnected DB: ' + _config.MONGODB_URL);
});

_mongoose["default"].connect(_config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

_mongoose["default"].connection.once('open', function () {
  console.log('connected to mongoose... DB: ' + _config.MONGODB_URL);
});