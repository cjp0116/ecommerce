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

export const createSendToken = (user, statusCode, req, res) => {
  const token = createToken(user);
  res.cookie('jwt', token, {
    expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly : true,
    secure : req.secure || req.headers['x-forwarded-proto'] === 'https',  
  });
  user.password = undefined;
  res.status(statusCode).json({
    status : 'success',
    token,
    user
  })
}