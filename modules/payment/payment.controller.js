const {checkoutBasket} = require("./payment.service");

async function checkoutBasketHandler(req, res, next) {
  const {id: userId} = req.user;
  const result = await checkoutBasket(userId);
  return res.json(result);
}

module.exports = {
  checkoutBasketHandler,
};
