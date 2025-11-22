const {
  addToBasketHandler,
  deleteFromBasketHandler,
  findUserBasketHandler,
} = require("./basket.controller");

const router = require("express").Router();
router.get("/", findUserBasketHandler);
router.post("/:courseId", addToBasketHandler);
router.delete("/:courseId", deleteFromBasketHandler);
module.exports = {
  BasketRouter: router,
};
