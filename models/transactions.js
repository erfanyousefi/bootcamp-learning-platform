const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");

class Transaction extends Model {}
Transaction.init(
  {
    type: {
      type: DataTypes.ENUM(
        "deposit",
        "withdraw",
        "transfer",
        "purchase",
        "refund"
      ),
    },
    amount: {type: DataTypes.DECIMAL(10, 2), defaultValue: 0},
    status: {
      type: DataTypes.ENUM("pending", "success", "failed"),
      defaultValue: "pending",
    },
    description: {type: DataTypes.TEXT},
    walletId: {type: DataTypes.INTEGER},
  },
  {
    sequelize: sequelize,
    modelName: "Transaction",
    tableName: "transactions",
  }
);

module.exports = Transaction;
