const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");

class Basket extends Model {}
Basket.init(
  {
    userId: {type: DataTypes.INTEGER, allowNull: false},
  },
  {
    sequelize: sequelize,
    modelName: "Basket",
    tableName: "basket",
  }
);

module.exports = Basket;
