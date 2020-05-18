const express = require("express");
const router = express.Router();

const GamesController = require('../controller/GamesController');

router.get("/", GamesController.dates);
router.get("/games", GamesController.search);
router.get("/partials", GamesController.partials);

module.exports = router;
