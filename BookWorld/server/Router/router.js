const express = require("express");
const router = express.Router();
const bookController = require("./bookController");
const userController = require("./userController");

router.use("/Books", bookController);
router.use("/Users", userController);

module.exports = router;