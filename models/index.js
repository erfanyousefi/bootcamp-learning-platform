const sequelize = require("../config/database");
const Chapter = require("./chapter.model");
const Course = require("./course.model");
const Episode = require("./episode.model");
const User = require("./user.model");

// course -> chapter
Course.hasMany(Chapter, {
  foreignKey: "courseId",
  as: "chapters",
});
Chapter.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

// Chapter -> episode
Chapter.hasMany(Episode, {
  foreignKey: "chapterId",
  as: "episodes",
});
Episode.belongsTo(Chapter, {
  foreignKey: "chapterId",
  as: "chapter",
});
async function syncModels() {
  await sequelize.sync({alter: true});
}
module.exports = {
  syncModels,
  Course,
  Chapter,
  Episode,
  User,
};
