import { useEffect, useState } from "react";
import api from "../api/axios";

function PersonalizedFeed() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    api.get("/plans/feed").then((res) => setPlans(res.data));
  }, []);

  const subscribe = async (planId) => {
    await api.post(`/subscriptions/${planId}`);
    setPlans(
      plans.map((p) =>
        p._id === planId ? { ...p, isSubscribed: true } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800">My Feed</h2>
          <p className="text-gray-500 mt-1">
            Personalized plans from trainers you follow
          </p>
        </div>

        {/* Empty State */}
        {plans.length === 0 && (
          <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
            <p className="text-lg font-medium">
              Follow trainers to see their plans
            </p>
            <p className="text-sm mt-1">
              Your personalized fitness feed will appear here 💪
            </p>
          </div>
        )}

        {/* Plans */}
        <div className="grid sm:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="group bg-white rounded-2xl shadow-md p-6 transition transform hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                  {plan.title}
                </h3>
                <span className="text-sm font-semibold text-green-600">
                  ₹{plan.price}
                </span>
              </div>

              {/* Trainer */}
              <p className="text-sm text-gray-500 mb-2">
                Trainer:{" "}
                <span className="font-medium text-gray-700">
                  {plan.trainer.name}
                </span>
              </p>

              {/* Subscribed Content */}
              {plan.isSubscribed ? (
                <>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                    {plan.description}
                  </p>

                  <p className="text-sm text-gray-500 mb-4">
                    Duration:{" "}
                    <span className="font-medium text-gray-700">
                      {plan.duration}
                    </span>
                  </p>

                  <button
                    disabled
                    className="w-full py-2 rounded-lg bg-gray-200 text-gray-600 font-semibold cursor-not-allowed"
                  >
                    Subscribed ✅
                  </button>
                </>
              ) : (
                <button
                  onClick={() => subscribe(plan._id)}
                  className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:from-green-600 hover:to-emerald-600 transition"
                >
                  Subscribe
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PersonalizedFeed;
