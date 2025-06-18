const { Router } = require("express");
const v1 = Router();
const adminRouter = require("./admin/router");
// const userRouter = require("./user/router");
// const commonRouter = require("./common/router");
// const swaggerRouter = require("./swagger/index");

v1.get("/", (req, res) => {
  res.status(200).json({ message: "v1 routes is working!!" });
});

v1.use("/admin", adminRouter);
// v1.use("/user", userRouter);
// v1.use("/common", commonRouter);
// v1.use("/swagger", swaggerRouter);

module.exports = v1;
