const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");

class UserCourse extends Model {}
UserCourse.init(
  {
    userId: {type: DataTypes.INTEGER},
    paymentId: {type: DataTypes.INTEGER},
    courseId: {type: DataTypes.INTEGER},
    spotplayerKey: {type: DataTypes.TEXT},
    description: {type: DataTypes.TEXT},
    status: {
      type: DataTypes.ENUM("active", "decActive"),
      defaultValue: "active",
    },
  },
  {
    sequelize: sequelize,
    modelName: "UserCourse",
    tableName: "user_courses",
  }
);

module.exports = User;
