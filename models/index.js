const sequelize = require("../config/database");
const BasketCoupon = require("./baske-copun.model");
const BasketItem = require("./baske-items.model");
const Basket = require("./basket.model");
const Chapter = require("./chapter.model");
const Course = require("./course.model");
const Episode = require("./episode.model");
const User = require("./user.model");

// course -> chapter
Course.hasMany(Chapter, {
  foreignKey: "courseId",
  as: "chapters",
});
Chapter.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

// Chapter -> episode
Chapter.hasMany(Episode, {
  foreignKey: "chapterId",
  as: "episodes",
  onDelete: "CASCADE",
});
Episode.belongsTo(Chapter, {
  foreignKey: "chapterId",
  as: "chapter",
  onDelete: "CASCADE",
});

// Teacher -> Course
User.hasMany(Course, {
  foreignKey: "teacherId",
  as: "courses",
});
Course.belongsTo(User, {
  foreignKey: "teacherId",
  as: "teacher",
  onDelete: "SET NULL",
});

//Basket, items, coupons
User.hasOne(Basket, {
  foreignKey: "userId",
  as: "basket",
  onDelete: "CASCADE",
});
Basket.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Basket.hasMany(BasketItem, {
  foreignKey: "basketId",
  as: "items",
  onDelete: "CASCADE",
});
BasketItem.belongsTo(Basket, {
  foreignKey: "basketId",
  as: "basket",
});

Course.hasMany(BasketItem, {
  foreignKey: "courseId",
  as: "basket",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
BasketItem.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Basket.hasMany(BasketCoupon, {
  foreignKey: "basketId",
  as: "coupons",
  onDelete: "CASCADE",
});
BasketCoupon.belongsTo(Basket, {
  foreignKey: "basketId",
  as: "basket",
});

async function syncModels() {
  await sequelize.sync({alter: true});
}
module.exports = {
  syncModels,
  Course,
  Chapter,
  Episode,
  User,
};
