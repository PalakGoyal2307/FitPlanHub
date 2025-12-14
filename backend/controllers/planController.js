const Plan = require("../models/Plan");

exports.createPlan = async (req, res) => {
  const plan = await Plan.create({
    ...req.body,
    trainer: req.user.id
  });
  res.status(201).json(plan);
};

exports.getAllPlans = async (req, res) => {
  const plans = await Plan.find().populate("trainer", "name");
  res.json(plans);
};

// ================= GET LOGGED-IN TRAINER PLANS =================
exports.getMyPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ trainer: req.user.id });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE PLAN =================
exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Ensure trainer owns this plan
    if (plan.trainer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedPlan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE PLAN =================
exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Ensure trainer owns this plan
    if (plan.trainer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await plan.deleteOne();
    res.json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Follow = require("../models/Follow");
const Subscription = require("../models/Subscription");

exports.getUserFeed = async (req, res) => {
  const userId = req.user.id;

  // 1️⃣ trainers user follows
  const follows = await Follow.find({ user: userId });
  const trainerIds = follows.map(f => f.trainer);

  // if user follows nobody
  if (trainerIds.length === 0) {
    return res.json([]);
  }

  // 2️⃣ plans only from followed trainers
  const plans = await Plan.find({ trainer: { $in: trainerIds } })
    .populate("trainer", "name email");

  // 3️⃣ subscribed plans
  const subscriptions = await Subscription.find({ user: userId });
  const subscribedPlanIds = subscriptions.map(s => s.plan.toString());

  // 4️⃣ shape response
  const feed = plans.map(plan => {
    const isSubscribed = subscribedPlanIds.includes(plan._id.toString());

    const response = {
      _id: plan._id,
      title: plan.title,
      price: plan.price,
      trainer: {
        name: plan.trainer.name,
        email: plan.trainer.email
      },
      isSubscribed
    };

    // unlock details only if subscribed
    if (isSubscribed) {
      response.description = plan.description;
      response.duration = plan.duration;
    }

    return response;
  });

  res.json(feed);
};