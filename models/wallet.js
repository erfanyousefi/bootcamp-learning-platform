const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");

class Wallet extends Model {}
Wallet.init(
  {
    userId: {type: DataTypes.INTEGER},
    balance: {type: DataTypes.DECIMAL(10, 2), defaultValue: 0},
  },
  {
    sequelize: sequelize,
    modelName: "Wallet",
    tableName: "wallets",
  }
);

module.exports = Wallet;
