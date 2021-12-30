"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cartSchema = new _mongoose.default.Schema({
  userId: {
    type: String,
    required: true
  },
  products: [{
    productId: {
      type: String
    },
    quantity: {
      type: Number,
      default: 1
    }
  }]
}, {
  timestamps: true
});

var _default = _mongoose.default.model("Cart", cartSchema);

exports.default = _default;