const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const controller = require("../controller/home");
const { adminAuth } = require("../middleware/adminAuth");

router.get("/", controller.getHome);
router.use(adminAuth);
router.post("/", upload.any(), controller.createOrUpdateHome);

module.exports = router;
