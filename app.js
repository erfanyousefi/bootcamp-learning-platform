require("dotenv").config();
const express = require("express");
const {syncModels} = require("./models/index");
const {AllRoutes} = require("./modules/index.routes");
const app = express();
syncModels()
  .then(() => {
    console.log("Models synced successfully");
  })
  .catch((err) => {
    console.log("Sync error", err);
  });

app.use(express.json());
app.use(express.urlencoded());
app.use(AllRoutes);
app.use((req, res, next) => {
  res.status(404).json({
    data: null,
    error: {
      message: "not found route",
    },
  });
});
app.use((err, req, res, next) => {
  res.status(err?.status ?? 500).json({
    data: null,
    error: {
      message: err?.message ?? "internal server error",
    },
  });
});
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
