const express = require("express");
const protect = require("../middleware/authMiddleware");
const isUser = require("../middleware/userMiddleware");
const {
  followTrainer,
  unfollowTrainer,
  getFollowedTrainers
} = require("../controllers/followController");

const router = express.Router();

router.post("/:trainerId", protect, isUser, followTrainer);
router.delete("/:trainerId", protect, isUser, unfollowTrainer);
router.get("/my", protect, isUser, getFollowedTrainers);

module.exports = router;
