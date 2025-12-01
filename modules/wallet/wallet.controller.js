const {deposit, withdrawal} = require("./wallet.service");

async function depositHandler(req, res, next) {
  const {id: userId} = req.user;
  const {amount = 0} = req.body;
  const result = await deposit(userId, amount);
  res.json(result);
}
async function withdrawalHandler(req, res, next) {
  const {id: userId} = req.user;
  const {amount = 0} = req.body;
  const result = await withdrawal(userId, amount);
  res.json(result);
}

module.exports = {
  depositHandler,
  withdrawalHandler,
};
