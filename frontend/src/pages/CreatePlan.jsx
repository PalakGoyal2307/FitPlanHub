import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function CreatePlan() {
  const [plan, setPlan] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
  });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/plans", plan);
    navigate("/trainer/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-10">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6">

        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Create Fitness Plan
          </h2>
          <p className="text-gray-500 mt-1">
            Design a plan to help users reach their goals
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan Title
            </label>
            <input
              placeholder="e.g. 30-Day Strength Builder"
              value={plan.title}
              onChange={(e) =>
                setPlan({ ...plan, title: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe what this plan includes..."
              value={plan.description}
              onChange={(e) =>
                setPlan({ ...plan, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
              required
            />
          </div>

          {/* Price & Duration */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                placeholder="499"
                value={plan.price}
                onChange={(e) =>
                  setPlan({ ...plan, price: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <input
                placeholder="8 weeks"
                value={plan.duration}
                onChange={(e) =>
                  setPlan({ ...plan, duration: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:from-green-600 hover:to-emerald-600 transition transform hover:scale-[1.02]"
          >
            Create Plan
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePlan;
