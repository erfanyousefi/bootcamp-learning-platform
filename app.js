const express = require("express");
const {syncModels} = require("./models/index");
const app = express();
app.use(express.json());
app.use(express.urlencoded());

syncModels()
  .then(() => {
    console.log("Models synced successfully");
  })
  .catch((err) => {
    console.log("Sync error", err);
  });
app.listen(3300, () => console.log("Server running on port 3300"));
