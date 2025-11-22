const {addToBasket, deleteFromBasket, getBasket} = require("./basket.service");

async function addToBasketHandler(req, res, next) {
  const {id: userId} = req.user;
  const {courseId} = req.params;
  const result = await addToBasket(courseId, userId);
  return res.json(result);
}
async function deleteFromBasketHandler(req, res, next) {
  const {id: userId} = req.user;
  const {courseId} = req.params;
  const result = await deleteFromBasket(courseId, userId);
  return res.json(result);
}
async function findUserBasketHandler(req, res, next) {
  const {id: userId} = req.user;
  const result = await getBasket(userId);
  return res.json(result);
}

module.exports = {
  addToBasketHandler,
  deleteFromBasketHandler,
  findUserBasketHandler,
};
