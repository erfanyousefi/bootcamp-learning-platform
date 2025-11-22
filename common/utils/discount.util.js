function getDiscountAmount(amount, discount) {
  const percentage = discount / 100;
  return amount * percentage;
}

module.exports = {
  getDiscountAmount,
};
