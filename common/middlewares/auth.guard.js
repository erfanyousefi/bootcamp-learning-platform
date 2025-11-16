const createHttpError = require("http-errors");
const jsonwebtoken = require("jsonwebtoken");
const {User} = require("../../models");

async function CheckAuth(req, res, next) {
  const {authorization = null} = req.headers;
  if (!authorization || typeof authorization != "string")
    throw createHttpError(401, "Login on your account");
  const [bearer, token] = authorization?.split(" ");
  if (
    !bearer ||
    !token ||
    bearer?.toLowerCase() != "bearer" ||
    token?.split(".")?.length != 3
  )
    throw createHttpError(401, "Login on your account");

  try {
    const decoded = jsonwebtoken.verify(token, process.env.TOKEN_SECRET_KEY);
    if (decoded?.userId) {
      const user = await User.findByPk(decoded.userId);
      if (!user) throw createHttpError(401, "notfound account!");
      req.user = {
        id: user.id,
        firstname: user?.firstname,
        lastname: user?.lastname,
        mobile: user?.mobile,
        avatar: user?.avatar,
        wallet_balance: user?.wallet_balance,
        status: user?.status,
      };
      return next();
    }
    throw createHttpError(401, "notfound account!");
  } catch (error) {
    throw createHttpError(401, "Your session is expired, login again");
  }
}

module.exports = CheckAuth;
