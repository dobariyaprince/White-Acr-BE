const { Router } = require("express");
const router = Router();
const authRoute = require("./auth");
const profileRoute = require("./profile");
const homeRoute = require("./home");
const aboutUsRoute = require("./aboutUs");
const projectRoute = require("./project");
const { adminAuth } = require("../middleware/adminAuth");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Admin routes is working!!" });
});

router.use("/auth", authRoute);
router.use("/home", homeRoute);
router.use("/aboutUs", aboutUsRoute);
router.use("/project", projectRoute);
router.use(adminAuth);
router.use("/profile", profileRoute);

module.exports = router;
