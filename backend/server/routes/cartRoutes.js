import Cart from "../models/Cart";
import express from "express";
import {
  updateOne,
  getOne,
  deleteOne,
  createOne,
  getAll,
} from "../util/handlerFactory";
import { ensureAdminOrCorrectUser, ensureAdmin } from "../middlewares/authMiddlewares";
const router = express.Router();

router.post("/", ensureAdminOrCorrectUser, createOne(Cart));
router.patch("/:id",ensureAdminOrCorrectUser,  updateOne(Cart));
router.delete("/:id",ensureAdminOrCorrectUser,  deleteOne(Cart));
router.get("/:id", ensureAdminOrCorrectUser, getOne(Cart));
router.get("/", ensureAdmin, getAll(Cart));

export default router;