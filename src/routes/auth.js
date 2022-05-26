const { authController } = require("../controller");
const authorizedLoginUser = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/keep_login", authorizedLoginUser, authController.keepLogin);

module.exports = router;
