const createHttpError = require("http-errors");
const {User} = require("../../models");
const {randomInt} = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
async function sendOtp(mobile) {
  const code = randomInt(10000, 99999).toString();
  const expiration = new Date(Date.now() + 1000 * 60 * 2);
  const user = await User.findOne({where: {mobile}});
  if (!user) {
    await User.create({
      mobile,
      otp_code: code,
      otp_expires: expiration,
    });
  } else {
    user.otp_code = code;
    user.otp_expires = expiration;
    await user.save();
  }
  return {
    message: "Sent otp code successfully",
    code,
  };
}
async function checkOtp(mobile, code) {
  const now = new Date();
  const user = await User.findOne({where: {mobile}});
  if (!user) {
    throw createHttpError(401, "not found account");
  }
  
  if (user.wrong_count >= 3) {
    throw createHttpError(
      401,
      "You trying more than 3 times  you cant login on your account"
    );
  }
  if (user.status === "bad") {
    throw createHttpError(
      401,
      "Your account is banned. track using support section"
    );
  }
  if (user.otp_expires < now) {
    user.wrong_count += 1;
    await user.save();
    throw createHttpError(401, "otp code is expired");
  }
  if (user.otp_code !== code) {
    user.wrong_count += 1;
    await user.save();
    throw createHttpError(401, "otp code is wrong");
  }
  if (user.status === "pending") {
    user.status = "active";
  }
  user.wrong_count = 0;
  await user.save();
  const accessToken = jsonwebtoken.sign(
    {userId: user.id},
    process.env.TOKEN_SECRET_KEY,
    {expiresIn: "1d"}
  );
  return {
    accessToken,
  };
}

module.exports = {
  sendOtp,
  checkOtp,
};
