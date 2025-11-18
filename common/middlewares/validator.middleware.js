const {validationResult} = require("express-validator");

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: {
        message: "Validation error",
        errors: errors.array().map((e) => e.msg),
      },
      data: null,
    });
  }
  next();
}

module.exports = {
  validate,
};
