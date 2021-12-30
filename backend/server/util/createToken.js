import jwt from "jsonwebtoken";

export const createToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin || false,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  return token;
};
