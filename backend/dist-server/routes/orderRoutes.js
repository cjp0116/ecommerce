"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Cart = _interopRequireDefault(require("../models/Cart"));

var _express = _interopRequireDefault(require("express"));

var _handlerFactory = require("../util/handlerFactory");

var _authMiddlewares = require("../middlewares/authMiddlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post("/", _authMiddlewares.ensureAdminOrCorrectUser, (0, _handlerFactory.createOne)(_Cart.default));
router.patch("/:id", _authMiddlewares.ensureAdminOrCorrectUser, (0, _handlerFactory.updateOne)(_Cart.default));
router.delete("/:id", _authMiddlewares.ensureAdminOrCorrectUser, (0, _handlerFactory.deleteOne)(_Cart.default));
router.get("/:id", _authMiddlewares.ensureAdminOrCorrectUser, (0, _handlerFactory.getOne)(_Cart.default));
router.get("/", _authMiddlewares.ensureAdmin, (0, _handlerFactory.getAll)(_Cart.default)); // GET monthly income

router.get("/income", _authMiddlewares.ensureAdmin, async (req, res, next) => {
  try {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    const income = await _Cart.default.aggregate([{
      $match: {
        createdAt: {
          $gte: previousMonth
        }
      }
    }, {
      $project: {
        month: {
          $month: "$createdAt"
        },
        sales: "$amount"
      }
    }, {
      $group: {
        _id: "$month",
        total: {
          $sum: "$sales"
        }
      }
    }]);
    return res.status(200).json(income);
  } catch (error) {
    return next(error);
  }
});
var _default = router;
exports.default = _default;