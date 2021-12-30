import User from "../models/User";
import express from "express";
import { updateOne, getOne, getAll, deleteOne } from "../util/handlerFactory";
import { ensureAdmin, ensureAdminOrCorrectUser } from "../middlewares/authMiddlewares";
const router = express.Router();


router.get("/stats", ensureAdmin, async (req, res, next) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    
    const data = await User.aggregate([
      { $match : { createdAt : { $gte : lastYear } } },
      { $project: {
        month : { $month : "$createdAt" }
      }},
      { $group : { 
        _id : "$month",
        total : { $sum : 1 } 
      }}
    ])

    return res.status(200).json({
      status : 'success',
      data
    });
    
  } catch (error) {
    return next(error);
  }
})

router.get("/", getAll(User));
router.get("/:id", getOne(User));
router.put("/:id", ensureAdminOrCorrectUser, updateOne(User));
router.delete("/:id", ensureAdminOrCorrectUser, deleteOne(User));



export default router;
