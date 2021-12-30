"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Product = _interopRequireDefault(require("../models/Product"));

var _express = _interopRequireDefault(require("express"));

var _handlerFactory = require("../util/handlerFactory");

var _authMiddlewares = require("../middlewares/authMiddlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post("/", _authMiddlewares.ensureAdmin, (0, _handlerFactory.createOne)(_Product.default));
router.patch("/:id", _authMiddlewares.ensureAdmin, (0, _handlerFactory.updateOne)(_Product.default));
router.delete("/:id", _authMiddlewares.ensureAdmin, (0, _handlerFactory.deleteOne)(_Product.default));
router.get("/:id", (0, _handlerFactory.getOne)(_Product.default));
router.get("/", async (req, res, next) => {
  try {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    let products;

    if (qNew) {
      products = await _Product.default.find().sort({
        createdAt: -1
      }).limit(5);
    } else if (qCategory) {
      products = await _Product.default.find({
        categories: {
          $in: [qCategory]
        }
      });
    } else {
      products = await _Product.default.find({});
    }

    return res.status(200).json({
      status: 'sucess',
      numResults: products.length,
      results: products
    });
  } catch (error) {
    return next(error);
  }
});
var _default = router;
exports.default = _default;