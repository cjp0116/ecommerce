"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOne = exports.getOne = exports.getAll = exports.deleteOne = exports.createOne = void 0;

var _ExpressError = require("../util/ExpressError");

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createOne = Model => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    if (!doc) throw new _ExpressError.BadRequestError();
    return res.status(201).json(doc);
  } catch (error) {
    return next(error);
  }
};

exports.createOne = createOne;

const updateOne = Model => async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = _cryptoJs.default.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true
    });
    if (!doc) throw new _ExpressError.BadRequestError();
    return res.status(201).json(doc);
  } catch (error) {
    return next(error);
  }
};

exports.updateOne = updateOne;

const getOne = Model => async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) throw new _ExpressError.NotFoundError();
    return res.status(200).json(doc);
  } catch (error) {
    return next(error);
  }
};

exports.getOne = getOne;

const getAll = Model => async (req, res, next) => {
  try {
    const query = req.query.new;
    const docs = query ? await Model.find().sort({
      _id: -1
    }).limit(5) : await Model.find({});
    return res.status(200).json({
      status: "success",
      numResults: docs.length,
      results: docs
    });
  } catch (error) {
    return next(error);
  }
};

exports.getAll = getAll;

const deleteOne = Model => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) throw new _ExpressError.NotFoundError();
    return res.status(200).json({
      status: "success",
      message: "deleted document"
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteOne = deleteOne;