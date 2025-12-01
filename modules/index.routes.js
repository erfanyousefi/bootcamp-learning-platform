const CheckAuth = require("../common/middlewares/auth.guard");
const {AuthRouter} = require("./auth/auth.routes");
const {BasketRouter} = require("./basket/basket.routes");
const {CourseRouter} = require("./course/course.routes");
const {PaymentRouter} = require("./payment/payment.routes");
const {WalletRouter} = require("./wallet/wallet.routes");

const router = require("express").Router();
router.use("/auth", AuthRouter);
router.use("/course", CheckAuth, CourseRouter);
router.use("/basket", CheckAuth, BasketRouter);
router.use("/payment", CheckAuth, PaymentRouter);
router.use("/wallet", CheckAuth, WalletRouter);
module.exports = {
  AllRoutes: router,
};
