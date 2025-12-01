const {depositHandler, withdrawalHandler} = require("./wallet.controller");

const router = require("express").Router();
router.post("/deposit", depositHandler);
router.post("/withdraw", withdrawalHandler);
module.exports = {
  WalletRouter: router,
};
