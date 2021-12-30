import { BadRequestError, NotFoundError } from "../util/ExpressError";
import CryptoJS from "crypto-js";

const createOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    if (!doc) throw new BadRequestError();
    return res.status(201).json(doc);
  } catch (error) {
    return next(error);
  }
};

const updateOne = (Model) => async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!doc) throw new BadRequestError();
    return res.status(201).json(doc);
  } catch (error) {
    return next(error);
  }
};

const getOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) throw new NotFoundError();
    return res.status(200).json(doc);
  } catch (error) {
    return next(error);
  }
};

const getAll = (Model) => async (req, res, next) => {
  try {
    const query = req.query.new;
    const docs = query
      ? await Model.find().sort({ _id: -1 }).limit(5)
      : await Model.find({});
    return res.status(200).json({
      status: "success",
      numResults: docs.length,
      results: docs,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) throw new NotFoundError();
    return res.status(200).json({
      status: "success",
      message: "deleted document",
    });
  } catch (error) {
    return next(error);
  }
};

export { getOne, updateOne, deleteOne, createOne, getAll };
