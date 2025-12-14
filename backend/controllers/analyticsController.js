const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");

exports.getTrainerAnalytics = async (req, res) => {
  try {
    const trainerId = req.user.id;

    // Get trainer plans
    const plans = await Plan.find({ trainer: trainerId });

    const planIds = plans.map(plan => plan._id);

    // Get subscriptions for trainer's plans
    const subscriptions = await Subscription.find({
      plan: { $in: planIds }
    });

    const totalSubscribers = subscriptions.length;

    // Subscribers per plan
    const planStats = plans.map(plan => {
      const count = subscriptions.filter(
        sub => sub.plan.toString() === plan._id.toString()
      ).length;

      return {
        planId: plan._id,
        title: plan.title,
        price: plan.price,
        subscribers: count,
        revenue: count * plan.price
      };
    });

    const totalRevenue = planStats.reduce(
      (sum, p) => sum + p.revenue,
      0
    );

    res.json({
      totalPlans: plans.length,
      totalSubscribers,
      totalRevenue,
      plans: planStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
