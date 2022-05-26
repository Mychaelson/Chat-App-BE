const router = require("express").Router();
const { userControllers } = require("../controller");

router.get("/", userControllers.getAllUser);

module.exports = router;
