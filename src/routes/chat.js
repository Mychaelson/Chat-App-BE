const { chatControllers } = require("../controller");

const router = require("express").Router();

router.get("/", (req, res) => {
  return res.status(200);
});

module.exports = router;
