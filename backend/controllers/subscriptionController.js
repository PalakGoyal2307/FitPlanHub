const Subscription = require("../models/Subscription");
const Plan = require("../models/Plan");

// ================= SUBSCRIBE TO PLAN =================
exports.subscribeToPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const planId = req.params.planId;

    // Check plan exists
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Check already subscribed
    const existing = await Subscription.findOne({
      user: userId,
      plan: planId
    });

    if (existing) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    // Simulated payment success
    const subscription = await Subscription.create({
      user: userId,
      plan: planId
    });

    res.status(201).json({
      message: "Subscription successful",
      subscription
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET USER SUBSCRIPTIONS =================
exports.getMySubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.user.id
    }).populate("plan");

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
