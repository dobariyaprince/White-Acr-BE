const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const createOrUpdateProjects = require("../controller/project/createOrUpdate");
const getProjects = require("../controller/project/getDetails");
const deleteProject = require("../controller/project/deleteProject");
const { adminAuth } = require("../middleware/adminAuth");

router.get("/", getProjects);
router.get("/:projectId", getProjects);
router.use(adminAuth);
router.post("/", upload.any(), createOrUpdateProjects);
router.delete("/:projectId", deleteProject);

module.exports = router;
