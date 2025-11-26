const {User, Course} = require("../../models");
const PaymentDetails = require("../../models/payment-detail.model");
const Payment = require("../../models/payment.model");
const {checkoutBasketHandler} = require("./payment.controller");

const router = require("express").Router();
router.post("/checkout", checkoutBasketHandler);

router.get("/my", async (req, res, next) => {
  const {id: userId} = req.user;
  const payments = await Payment.findAll({
    where: {userId},
    include: [
      {
        model: PaymentDetails,
        as: "details",
        include: [
          {model: Course, as: "course", attributes: ["id", "title", "image"]},
        ],
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "firstname", "lastname", "avatar"],
      },
    ],
  });
  res.json({
    data: payments,
  });
});
module.exports = {
  PaymentRouter: router,
};
