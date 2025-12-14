const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  subscribeToPlan,
  getMySubscriptions
} = require("../controllers/subscriptionController");

const router = express.Router();

// User subscribes to plan
router.post("/:planId", protect, subscribeToPlan);

// User views their subscriptions
router.get("/my", protect, getMySubscriptions);

module.exports = router;
