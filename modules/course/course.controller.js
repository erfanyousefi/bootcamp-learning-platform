const {
  createCourse,
  findAllCourse,
  findOneByIdCourse,
  deleteCourse,
} = require("./course.service");

//{chapters: [ {..., episodes: [{}, {}, {}]}  ]}

async function createCourseHandler(req, res, next) {
  const {id: userId} = req.user;
  const {title, summary, image, duration, support, content, chapters} =
    req.body;
  const data = {
    title,
    teacherId: userId,
    summary,
    image,
    duration,
    support,
    content,
    chapters,
  };
  const result = await createCourse(data);
  return res.json(result);
}
async function updateCourseHandler(req, res, next) {}
async function findAllCourseHandler(req, res, next) {
  const result = await findAllCourse();
  return res.json(result);
}
async function findOneByIdCourseHandler(req, res, next) {
  const {id} = req.params;
  const result = await findOneByIdCourse(id);
  res.json(result);
}
async function deleteCourseHandler(req, res, next) {
  const {id} = req.params;
  const result = await deleteCourse(id);
  res.json(result);
}

module.exports = {
  createCourseHandler,
  updateCourseHandler,
  findAllCourseHandler,
  findOneByIdCourseHandler,
  deleteCourseHandler,
};
