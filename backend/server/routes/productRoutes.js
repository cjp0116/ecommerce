import Product from "../models/Product";
import express from "express";
import {
  updateOne,
  getOne,
  deleteOne,
  createOne,
} from "../util/handlerFactory";
import { ensureAdmin } from "../middlewares/authMiddlewares";
const router = express.Router();

router.post("/", ensureAdmin, createOne(Product));
router.patch("/:id", ensureAdmin, updateOne(Product));
router.delete("/:id", ensureAdmin, deleteOne(Product));

router.get("/:id", getOne(Product));
router.get("/", async (req, res, next) => {
  try {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({ categories: { $in: [qCategory] } });
    } else {
      products = await Product.find({});
    }
    return res.status(200).json({
      status : 'sucess',
      numResults : products.length,
      results : products
    })
  } catch (error) {
    return next(error);
  }
});

export default router;
