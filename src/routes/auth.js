const { authController } = require("../controller");

const router = require("express").Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;
