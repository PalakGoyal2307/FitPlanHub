const express = require("express");
const protect = require("../middleware/authMiddleware");
const isTrainer = require("../middleware/roleMiddleware");
const { getTrainerAnalytics } = require("../controllers/analyticsController");

const router = express.Router();

router.get("/trainer", protect, isTrainer, getTrainerAnalytics);

module.exports = router;
