const {
  addToBasketHandler,
  deleteFromBasketHandler,
} = require("./basket.controller");

const router = require("express").Router();
router.get("/", (req, res, next) => {
  res.send("coming soon...");
});
router.post("/:courseId", addToBasketHandler);
router.delete("/:courseId", deleteFromBasketHandler);
module.exports = {
  BasketRouter: router,
};
