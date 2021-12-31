import Cart from "../models/Cart";
import express from "express";
import {
  updateOne,
  getOne,
  deleteOne,
  createOne,
  getAll,
} from "../util/handlerFactory";
import { ensureAdminOrCorrectUser, ensureAdmin, ensureLoggedInAndNotExpired } from "../middlewares/authMiddlewares";
const router = express.Router();
// get all 
router.get("/", ensureAdmin, getAll(Cart));

router.get("/:id", ensureAdmin, getOne(Cart));

router.post("/", ensureLoggedInAndNotExpired, createOne(Cart));

router.patch("/:id",ensureAdminOrCorrectUser,  updateOne(Cart));

router.delete("/:id",ensureAdminOrCorrectUser, deleteOne(Cart));

// get user cart
router.get("/find/:userId", ensureAdminOrCorrectUser, async (req, res, next) => {
  try {
  const cart = await Cart.findOne({ userId });
  return res.status(200).json(cart);
  } catch (error) {
    return next(error);
  }
});



export default router;