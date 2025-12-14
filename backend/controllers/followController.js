const Follow = require("../models/Follow");
const User = require("../models/User");

// FOLLOW TRAINER
exports.followTrainer = async (req, res) => {
  const trainerId = req.params.trainerId;

  const trainer = await User.findById(trainerId);
  if (!trainer || trainer.role !== "trainer") {
    return res.status(404).json({ message: "Trainer not found" });
  }

  try {
    await Follow.create({
      user: req.user.id,
      trainer: trainerId
    });
    res.status(201).json({ message: "Trainer followed" });
  } catch (error) {
    res.status(400).json({ message: "Already following this trainer" });
  }
};

// UNFOLLOW TRAINER
exports.unfollowTrainer = async (req, res) => {
  await Follow.findOneAndDelete({
    user: req.user.id,
    trainer: req.params.trainerId
  });

  res.json({ message: "Trainer unfollowed" });
};

// GET FOLLOWED TRAINERS
exports.getFollowedTrainers = async (req, res) => {
  const follows = await Follow.find({ user: req.user.id })
    .populate("trainer", "name email");

  res.json(follows);
};
