const {body} = require("express-validator");

const createCourseValidator = [
  body("title").notEmpty().withMessage("title is required"),
  body("summary").notEmpty().withMessage("summary is required"),
  body("image").isURL().withMessage("image must be a valid url"),
  body("duration").notEmpty().withMessage("duration is required"),
  body("support").isNumeric().withMessage("support must ne a number"),
  body("content").notEmpty().withMessage("content is required"),

  //chapter array
  body("chapters")
    .optional()
    .isArray()
    .withMessage("chapters must be an array"),

  body("chapters.*.title").notEmpty().withMessage("chapter title is required"),
  body("chapters.*.description")
    .notEmpty()
    .withMessage("chapter description is required"),

  //episode array in chapters
  body("chapters.*.episodes")
    .optional()
    .isArray()
    .withMessage("episodes must be an array"),

  body("chapters.*.episodes.*.title")
    .notEmpty()
    .withMessage("episode title is required"),
  body("chapters.*.episodes.*.type")
    .notEmpty()
    .isIn(["free", "cash"])
    .withMessage("episode type must be free or cash"),
  body("chapters.*.episodes.*.videoUrl")
    .optional()
    .isURL()
    .withMessage("episode video url must be url"),
];

module.exports = {
  createCourseValidator,
};
