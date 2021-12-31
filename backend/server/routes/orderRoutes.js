import Order from "../models/Cart";
import express from "express";
import {
  updateOne,
  getOne,
  deleteOne,
  createOne,
  getAll,
} from "../util/handlerFactory";
import {
  ensureAdminOrCorrectUser,
  ensureAdmin,
} from "../middlewares/authMiddlewares";
const router = express.Router();

router.post("/", ensureAdminOrCorrectUser, createOne(Order));
router.patch("/:id", ensureAdminOrCorrectUser, updateOne(Order));
router.delete("/:id", ensureAdminOrCorrectUser, deleteOne(Order));
router.get("/:id", ensureAdminOrCorrectUser, getOne(Order));
router.get("/", ensureAdmin, getAll(Order));

// GET monthly income
router.get("/income", ensureAdmin, async (req, res, next) => {
  try {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    return res.status(200).json(income);
  } catch (error) {
    return next(error);
  }
});
export default router;
