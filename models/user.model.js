const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");

class User extends Model {}
User.init(
  {
    firstname: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    mobile: {type: DataTypes.STRING, allowNull: false},
    avatar: {type: DataTypes.STRING},
    wallet_balance: {type: DataTypes.DECIMAL(10, 2), defaultValue: 0},
    otp_code: {type: DataTypes.STRING},
    otp_expires: {type: DataTypes.DATE},
    wrong_count: {type: DataTypes.INTEGER, defaultValue: 0},
    status: {
      type: DataTypes.ENUM("active", "ban", "pending"),
      defaultValue: "pending",
    },
  },
  {
    sequelize: sequelize,
    modelName: "User",
    tableName: "users",
  }
);

module.exports = User;
