const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");

class BasketItem extends Model {}
BasketItem.init(
  {
    basketId: {type: DataTypes.INTEGER, allowNull: false},
    courseId: {type: DataTypes.INTEGER, allowNull: false},
  },
  {
    sequelize: sequelize,
    modelName: "BasketItem",
    tableName: "basket_items",
  }
);

module.exports = BasketItem;
