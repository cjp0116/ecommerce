"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _authMiddlewares = require("./middlewares/authMiddlewares");

var _ExpressError = require("./util/ExpressError");

var _index = _interopRequireDefault(require("./routes/index"));

var _authRoutes = _interopRequireDefault(require("./routes/authRoutes"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

var _productRoutes = _interopRequireDefault(require("./routes/productRoutes"));

var _cartRoutes = _interopRequireDefault(require("./routes/cartRoutes"));

var _orderRoutes = _interopRequireDefault(require("./routes/orderRoutes"));

var _stripeRoutes = _interopRequireDefault(require("./routes/stripeRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// routes imports
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.join(__dirname, '../public')));
app.use(_authMiddlewares.verifyToken);
app.use('/', _index.default);
app.use('/api/auth', _authRoutes.default);
app.use('/api/users', _userRoutes.default);
app.use('/api/products', _productRoutes.default);
app.use('/api/cart', _cartRoutes.default);
app.use('/api/orders', _orderRoutes.default);
app.use('/api/checkout', _stripeRoutes.default);
app.use((req, res, next) => {
  return next(new _ExpressError.NotFoundError());
});
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'something went wrong';
  return res.status(status).json({
    status,
    message
  });
});
var _default = app;
exports.default = _default;