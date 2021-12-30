"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderSchema = new _mongoose.default.Schema({
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
  }],
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  }
}, {
  timestamps: true
});

var _default = _mongoose.default.model("Order", orderSchema);

exports.default = _default;