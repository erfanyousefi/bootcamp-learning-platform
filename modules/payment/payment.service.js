const createHttpError = require("http-errors");
const PaymentDetails = require("../../models/payment-detail.model");
const Payment = require("../../models/payment.model");
const UserCourse = require("../../models/user-course.model");
const {getBasket} = require("../basket/basket.service");

async function checkoutBasket(userId) {
  const {data} = await getBasket(userId);
  const {totalAmount, finalAmount, discountAmount, basket} = data;
  if (basket.length === 0) {
    throw createHttpError(400, "your basket is empty");
  }
  const payment = await Payment.create({
    total: totalAmount,
    amount: finalAmount,
    discount: discountAmount,
    userId,
    status: "confirmed",
  });
  for (const item of basket) {
    const detail = await PaymentDetails.create({
      total: item?.totalAmount ?? 0,
      amount: item?.finalAmount ?? 0,
      discount: item?.discountAmount ?? 0,
      courseId: item.course.id,
      paymentId: payment.dataValues.id,
    });
    await UserCourse.create({
      userId,
      courseId: item.course.id,
      detailId: detail.dataValues.id,
    });
  }
  return {
    message: "Payment Done successfully!",
  };
}

module.exports = {
  checkoutBasket,
};
