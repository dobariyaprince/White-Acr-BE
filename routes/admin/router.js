const { Router } = require("express");
const router = Router();
const authRoute = require("./auth");
const profileRoute = require("./profile");
const { adminAuth } = require("../../middleware/adminAuth");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Admin routes is working!!" });
});

router.use("/auth", authRoute);
router.use(adminAuth);
router.use("/profile", profileRoute);

module.exports = router;
