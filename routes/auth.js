const { Router } = require("express");
const router = Router();
const { logIn } = require("../controller/auth/logIn");
const { signUp } = require("../controller/auth/signUp");

const { refreshToken } = require("../controller/auth/refreshToken");
const {
  validateEmailAndPassword,
} = require("../middleware/validateEmailAndPass");
const { refreshAuth } = require("../middleware/refreshAuth");
const { adminAuth } = require("../middleware/adminAuth");

router.post("/logIn", validateEmailAndPassword, logIn);
router.post("/token", refreshAuth, refreshToken);

router.post("/signUp", validateEmailAndPassword, signUp);

module.exports = router;
