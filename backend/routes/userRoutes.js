const express = require("express");
const protect = require("../middleware/authMiddleware");
const isTrainer = require("../middleware/roleMiddleware");
const {
  getTrainerProfile,
  getMyTrainerProfile
} = require("../controllers/userController");

const router = express.Router();

// user viewing trainer
router.get("/trainer/:trainerId", protect, getTrainerProfile);

// trainer viewing own profile
router.get("/me/profile", protect, isTrainer, getMyTrainerProfile);

module.exports = router;
