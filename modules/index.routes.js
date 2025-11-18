const {AuthRouter} = require("./auth/auth.routes");
const {CourseRouter} = require("./course/course.routes");

const router = require("express").Router();
router.use("/auth", AuthRouter);
router.use("/course", CourseRouter);
module.exports = {
  AllRoutes: router,
};
