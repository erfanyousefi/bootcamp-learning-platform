const createHttpError = require("http-errors");
const BasketItem = require("../../models/baske-items.model");
const Basket = require("../../models/basket.model");

async function addToBasket(courseId, userId) {
  let basket = await Basket.findOne({where: {userId}});
  if (!basket) {
    basket = await Basket.create({userId});
  }
  //Todo check user course for already buy course in user courses
  const existItem = await BasketItem.findOne({
    where: {
      courseId,
      basketId: basket.dataValues.id,
    },
  });
  if (existItem) throw createHttpError(400, "already exist in your basket");
  await BasketItem.create({
    courseId: +courseId,
    basketId: basket.dataValues.id,
  });
  return {
    error: null,
    data: {
      message: "add to your basket successfully",
    },
  };
}
async function deleteFromBasket(courseId, userId) {
  let basket = await Basket.findOne({where: {userId}});
  if (!basket) {
    throw createHttpError(400, "you don't have active basket");
  }
  const existItem = await BasketItem.findOne({
    where: {
      courseId,
      basketId: basket.dataValues.id,
    },
  });
  if (!existItem)
    throw createHttpError(400, "this course not exist in your basket");
  await BasketItem.destroy({
    where: {courseId, basketId: basket.dataValues.id},
  });
  return {
    error: null,
    data: {
      message: "deleted course in your basket successfully",
    },
  };
}

module.exports = {
  addToBasket,
  deleteFromBasket,
};
