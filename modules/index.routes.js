const {AuthRouter} = require("./auth/auth.routes");

const router = require("express").Router();
router.use("/auth", AuthRouter);
module.exports = {
  AllRoutes: router,
};
