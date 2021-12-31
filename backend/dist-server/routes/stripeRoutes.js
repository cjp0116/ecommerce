"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _stripe = _interopRequireDefault(require("stripe"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stripe = (0, _stripe.default)(process.env.STRIPE_SERVER_KEY);

const router = _express.default.Router();

router.post("/payment", (req, res) => {
  stripe.charges.create({
    source: req.body.tokenId,
    amount: req.body.amount,
    currency: "usd"
  }, (stripeError, stripeRes) => {
    if (stripeError) return res.status(500).json(stripeError);
    return res.status(200).json(stripeRes);
  });
});
var _default = router;
exports.default = _default;