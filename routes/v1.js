const { Router } = require("express");
const v1 = Router();
const router = require("./router");

v1.get("/", (req, res) => {
  res.status(200).json({ message: "v1 routes is working!!" });
});

v1.use("/", router);

module.exports = v1;
