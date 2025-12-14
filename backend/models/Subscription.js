const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan"
  }
}, { timestamps: true });

module.exports = mongoose.model("Subscription", subscriptionSchema);
