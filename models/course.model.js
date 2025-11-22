const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");

class Course extends Model {}
Course.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    support: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    activeDiscount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    teacherId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Course",
    tableName: "courses",
  }
);

module.exports = Course;
