const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");

class Payment extends Model {}
Payment.init(
  {
    total: {type: DataTypes.DECIMAL},
    amount: {type: DataTypes.DECIMAL},
    discount: {type: DataTypes.DECIMAL},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    ref_number: {type: DataTypes.STRING},
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "rejected"),
      defaultValue: "pending",
    },
  },
  {
    sequelize: sequelize,
    modelName: "Payment",
    tableName: "payments",
  }
);

module.exports = Payment;
