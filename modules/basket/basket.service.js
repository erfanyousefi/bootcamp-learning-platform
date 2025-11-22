const createHttpError = require("http-errors");
const BasketItem = require("../../models/baske-items.model");
const Basket = require("../../models/basket.model");
const {Course} = require("../../models");
const {getDiscountAmount} = require("../../common/utils/discount.util");

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
async function getBasket(userId) {
  const basketItems = await Basket.findOne({
    where: {userId},
    include: [
      {
        model: BasketItem,
        as: "items",
        include: {
          model: Course,
          as: "course",
        },
      },
    ],
  });
  let basket = [];
  let totalAmount = 0;
  let finalAmount = 0;
  let discountAmount = 0;
  for (const item of basketItems.items) {
    const {course} = item;
    if (!course) continue;
    let totalCourseAmount = course?.price ?? 0;
    let finalCourseAmount = totalCourseAmount;
    let discountCourseAmount = 0;
    if (course?.activeDiscount && course?.discount > 0) {
      discountCourseAmount = getDiscountAmount(
        totalCourseAmount,
        course.discount
      );
      finalCourseAmount -= discountCourseAmount;
    }
    totalAmount += Number(totalCourseAmount);
    finalAmount += Number(finalCourseAmount);
    discountAmount += Number(discountCourseAmount);
    basket.push({
      discountAmount: discountCourseAmount,
      totalAmount: totalCourseAmount,
      finalAmount: finalCourseAmount,
      course: {
        id: course.id,
        title: course.title,
        summary: course.summary,
        image: course.image,
        price: course.price,
        discount: course.discount,
        activeDiscount: course.activeDiscount,
      },
    });
  }
  return {
    error: null,
    data: {
      totalAmount,
      finalAmount,
      discountAmount,
      basket,
    },
  };
}

//checkout-basket
module.exports = {
  addToBasket,
  deleteFromBasket,
  getBasket,
};
