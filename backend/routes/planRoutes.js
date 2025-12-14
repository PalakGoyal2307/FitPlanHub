const express = require("express");
const protect = require("../middleware/authMiddleware");
const isTrainer = require("../middleware/roleMiddleware");

const {
  createPlan,
  getAllPlans,
  getMyPlans,
  updatePlan,
  deletePlan
} = require("../controllers/planController");

const router = express.Router();

// Public
router.get("/", getAllPlans);

// Trainer-only
router.post("/", protect, isTrainer, createPlan);
router.get("/my-plans", protect, isTrainer, getMyPlans);
router.put("/:id", protect, isTrainer, updatePlan);
router.delete("/:id", protect, isTrainer, deletePlan);

module.exports = router;

const isUser = require("../middleware/userMiddleware");
const { getUserFeed } = require("../controllers/planController");

router.get("/feed", protect, isUser, getUserFeed);
