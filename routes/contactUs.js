const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const controller = require("../controller/contactUs");
const { adminAuth } = require("../middleware/adminAuth");

router.get("/", controller.getDetails);
router.use(adminAuth);
router.post("/", upload.any(), controller.createOrUpdate);

module.exports = router;
