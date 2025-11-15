const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");

class Episode extends Model {}

Episode.init(
  {
    title: {type: DataTypes.STRING, allowNull: false},
    order: {type: DataTypes.INTEGER, defaultValue: 0},
    chapterId: {type: DataTypes.INTEGER, allowNull: false},
    type: {type: DataTypes.ENUM("free", "cash"), defaultValue: "free"},
    videoUrl: {type: DataTypes.STRING},
  },
  {
    sequelize: sequelize,
    modelName: "Episode",
    tableName: "episodes",
  }
);

module.exports = Episode;
