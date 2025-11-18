const {validate} = require("../../common/middlewares/validator.middleware");
const {
  createCourseHandler,
  findAllCourseHandler,
  findOneByIdCourseHandler,
  deleteCourseHandler,
} = require("./course.controller");
const {createCourseValidator} = require("./validator/course.validation");

const router = require("express").Router();
router.post("/", createCourseValidator, validate, createCourseHandler);
router.get("/", findAllCourseHandler);
router.get("/:id", findOneByIdCourseHandler);
router.delete("/:id", deleteCourseHandler);
module.exports = {
  CourseRouter: router,
};
