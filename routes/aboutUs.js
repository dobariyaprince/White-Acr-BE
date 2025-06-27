const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const createOrUpdateAboutUs = require("../controller/aboutUs/createOrUpdate");
const getAboutUs = require("../controller/aboutUs/getDetails");
const { adminAuth } = require("../middleware/adminAuth");

router.get("/", getAboutUs);
router.use(adminAuth);
router.post("/", upload.any(), createOrUpdateAboutUs);

module.exports = router;
