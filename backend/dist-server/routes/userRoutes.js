"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _express = _interopRequireDefault(require("express"));

var _handlerFactory = require("../util/handlerFactory");

var _authMiddlewares = require("../middlewares/authMiddlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/stats", _authMiddlewares.ensureAdmin, async (req, res, next) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const data = await _User.default.aggregate([{
      $match: {
        createdAt: {
          $gte: lastYear
        }
      }
    }, {
      $project: {
        month: {
          $month: "$createdAt"
        }
      }
    }, {
      $group: {
        _id: "$month",
        total: {
          $sum: 1
        }
      }
    }]);
    return res.status(200).json({
      status: 'success',
      data
    });
  } catch (error) {
    return next(error);
  }
});
router.get("/", (0, _handlerFactory.getAll)(_User.default));
router.get("/:id", (0, _handlerFactory.getOne)(_User.default));
router.put("/:id", _authMiddlewares.ensureAdminOrCorrectUser, (0, _handlerFactory.updateOne)(_User.default));
router.delete("/:id", _authMiddlewares.ensureAdminOrCorrectUser, (0, _handlerFactory.deleteOne)(_User.default));
var _default = router;
exports.default = _default;