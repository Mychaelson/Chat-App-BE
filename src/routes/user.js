const router = require("express").Router();
const { userControllers } = require("../controller");
const authorizedLoginUser = require("../middleware/authMiddleware");

router.get("/", authorizedLoginUser, userControllers.getAllUser);

module.exports = router;
