const express = require("express");
const router = express.Router();
const create = require("../controller/enquiry/create");
const getAll = require("../controller/enquiry/getAll");
const getOne = require("../controller/enquiry/getDetails");

router.post("/", create);
router.get("/", getAll);
router.get("/:enquiryId", getOne);

module.exports = router;
