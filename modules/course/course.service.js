const createHttpError = require("http-errors");
const {Course, Chapter, Episode} = require("../../models");

async function createCourse(data) {
  const {title, summary, image, duration, support, content, chapters} = data;
  let course = await Course.create({
    title,
    summary,
    image,
    duration,
    support,
    content,
  });
  let chapterIndex = 1;
  if (Array.isArray(chapters)) {
    for (const chapterData of chapters) {
      const {title, description, episodes} = chapterData;
      let chapter = await Chapter.create({
        title,
        description,
        order: chapterIndex,
        courseId: course.dataValues.id,
      });
      if (Array.isArray(episodes)) {
        let episodeList = episodes.map((ep) => {
          return {
            title: ep?.title,
            type: ep?.type,
            videoUrl: ep?.type === "free" ? ep?.videoUrl : null,
            chapterId: chapter.dataValues.id,
          };
        });
        if (episodeList.length > 0) {
          await Episode.bulkCreate(episodeList);
        }
      }
    }
  }
  return {
    error: null,
    data: {
      message: "Course created successfully",
    },
  };
}
async function updateCourse(data) {}
async function findAllCourse() {
  const courses = await Course.findAll({
    where: {},
    attributes: ["id", "title", "image", "duration", "summary"],
  });
  return {
    error: null,
    data: courses,
  };
}
async function findOneByIdCourse(id) {
  const course = await Course.findOne({
    where: {id},
    include: [
      {
        model: Chapter,
        as: "chapters",
        include: [{model: Episode, as: "episodes"}],
      },
    ],
  });
  if (!course) throw createHttpError(404, "not found course");
  return {
    error: null,
    data: course,
  };
}
async function deleteCourse(id) {
  const {data: course} = await findOneByIdCourse(id);
  await Course.destroy({
    where: {id: course.id},
  });
  return {
    data: {
      message: "course deleted successfully",
    },
  };
}

module.exports = {
  createCourse,
  updateCourse,
  findAllCourse,
  findOneByIdCourse,
  deleteCourse,
};
