const User = require("../models/User");
const Plan = require("../models/Plan");
const Follow = require("../models/Follow");
const Subscription = require("../models/Subscription");

/**
 * ================================
 * PUBLIC TRAINER PROFILE (USER)
 * ================================
 * GET /api/users/trainer/:trainerId
 * Access: User only
 */
exports.getTrainerProfile = async (req, res) => {
  try {
    const trainerId = req.params.trainerId;
    const userId = req.user.id;

    // validate trainer
    const trainer = await User.findById(trainerId);
    if (!trainer || trainer.role !== "trainer") {
      return res.status(404).json({ message: "Trainer not found" });
    }

    // check follow status
    const isFollowing = await Follow.exists({
      user: userId,
      trainer: trainerId
    });

    // get user's subscriptions
    const subscriptions = await Subscription.find({ user: userId });
    const subscribedPlanIds = subscriptions.map(s =>
      s.plan.toString()
    );

    // trainer plans
    const plans = await Plan.find({ trainer: trainerId });

    // format plans
    const formattedPlans = plans.map(plan => {
      const isSubscribed = subscribedPlanIds.includes(
        plan._id.toString()
      );

      const response = {
        _id: plan._id,
        title: plan.title,
        price: plan.price,
        isSubscribed
      };

      // unlock details only if subscribed
      if (isSubscribed) {
        response.description = plan.description;
        response.duration = plan.duration;
      }

      return response;
    });

    res.json({
      trainer: {
        _id: trainer._id,
        name: trainer.name,
        email: isFollowing ? trainer.email : null
      },
      isFollowing,
      plans: formattedPlans
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ================================
 * TRAINER SELF PROFILE
 * ================================
 * GET /api/users/me/profile
 * Access: Trainer only
 */
exports.getMyTrainerProfile = async (req, res) => {
  try {
    const trainerId = req.user.id;

    // ✅ fetch trainer from DB
    const trainer = await User.findById(trainerId).select(
      "name email role"
    );

    if (!trainer || trainer.role !== "trainer") {
      return res.status(404).json({ message: "Trainer not found" });
    }

    // trainer's plans
    const plans = await Plan.find({ trainer: trainerId });

    res.json({
      trainer,
      plans
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
