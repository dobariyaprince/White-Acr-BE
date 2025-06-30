const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const createOrUpdate = require("../controller/whiteArc/createOrUpdate");
const getWhiteArc = require("../controller/whiteArc/getDetails");
const { adminAuth } = require("../middleware/adminAuth")

router.get("/", getWhiteArc);
router.use(adminAuth);
router.post("/", upload.any(), createOrUpdate);

module.exports = router;
