import express from "express";
import User from "../models/User";
import CryptoJS from 'crypto-js';
import { BadRequestError, NotFoundError } from "../util/ExpressError";
import { createToken } from '../util/createToken';
const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    if(req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }
    const user = await User.create(req.body);
    if (!user) throw new BadRequestError()
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ username : req.body.username }).select("+password")
    if(!foundUser) throw new NotFoundError()
    
    const hashedPassword = CryptoJS.AES.decrypt(foundUser.password, process.env.PASS_SEC);
    const password = hashedPassword.toString(CryptoJS.enc.Utf8);
    if(password !== req.body.password) throw new BadRequestError();
    
    foundUser.password = undefined;
    const token = createToken(foundUser);
    
    return res.status(200).json({ foundUser, token});
  } catch (error) {
    return next(error);
  }
});

router.get('/logout', (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires : new Date(Date.now() + 10 * 1000),
    httpOnly : true
  });
  
})

export default router;

