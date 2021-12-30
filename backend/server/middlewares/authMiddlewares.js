import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../util/ExpressError";
import User from "../models/User";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.user = user;
    }
    return next();
  } catch (error) {
    return next();
  }
};

const ensureLoggedInAndNotExpired = async (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!user) throw new UnauthorizedError();
    const currentUser = await User.findById(user.id);
    if (!currentUser) throw new UnauthorizedError();
    req.user = currentUser;
    return next();
  } catch (error) {
    return next(error);
  }
};

const ensureAdmin = (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!user && !user.isAdmin) throw new UnauthorizedError();
    return next();
  } catch (error) {
    return next(error);
  }
};

const ensureAdminOrCorrectUser = (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!(user && (user.isAdmin || user.id === req.params.id))) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

export {
  verifyToken,
  ensureLoggedInAndNotExpired,
  ensureAdmin,
  ensureAdminOrCorrectUser,
};
