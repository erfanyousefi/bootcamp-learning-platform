const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");

class User extends Model {}
User.init(
  {
    firstname: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    mobile: {type: DataTypes.STRING, allowNull: false},
    avatar: {type: DataTypes.STRING},
    otp_code: {type: DataTypes.STRING},
    otp_expires: {type: DataTypes.DATE},
    wrong_count: {type: DataTypes.INTEGER, defaultValue: 0},
    role: {
      type: DataTypes.ENUM("USER", "TEACHER", "ADMIN", "SUPPORT"),
      defaultValue: "USER",
    },
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
