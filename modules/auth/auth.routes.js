const CheckAuth = require("../../common/middlewares/auth.guard");
const {sendOtpHandler, checkOtpHandler} = require("./auth.controller");

const router = require("express").Router();
router.post("/send-otp", sendOtpHandler);
router.post("/check-otp", checkOtpHandler);
router.get("/whoami", CheckAuth, (req, res) => {
  res.json({
    error: null,
    data: req.user,
  });
});
module.exports = {
  AuthRouter: router,
};
