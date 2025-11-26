const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");

class PaymentDetails extends Model {}
PaymentDetails.init(
  {
    total: {type: DataTypes.DECIMAL},
    amount: {type: DataTypes.DECIMAL},
    discount: {type: DataTypes.DECIMAL},
    paymentId: {type: DataTypes.INTEGER, allowNull: false},
    courseId: {type: DataTypes.INTEGER, allowNull: false},
  },
  {
    sequelize: sequelize,
    modelName: "PaymentDetail",
    tableName: "payment_details",
  }
);

module.exports = PaymentDetails;
