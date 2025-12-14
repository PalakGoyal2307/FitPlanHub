import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function TrainerDashboard() {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);

  const fetchPlans = async () => {
    const res = await api.get("/plans/my-plans");
    setPlans(res.data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const deletePlan = async (id) => {
    if (!window.confirm("Delete this plan?")) return;
    await api.delete(`/plans/${id}`);
    fetchPlans();
  };

  const updatePlan = async () => {
    await api.put(`/plans/${editingPlan._id}`, editingPlan);
    setEditingPlan(null);
    fetchPlans();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Trainer Dashboard
          </h2>

          <div className="flex gap-3">
            <Link
              to="/create-plan"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition"
            >
              + Create Plan
            </Link>
            <Link
              to="/analytics"
              className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
            >
              Analytics
            </Link>
          </div>
        </div>

        {/* Plans Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            My Plans
          </h3>

          {plans.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              <p className="text-lg font-medium">No plans created yet</p>
              <p className="text-sm mt-1">
                Start by creating your first fitness plan 💪
              </p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="group border rounded-xl p-5 transition transform hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br from-white to-gray-50"
              >
                {editingPlan?._id === plan._id ? (
                  /* Edit Mode */
                  <div className="space-y-3">
                    <input
                      value={editingPlan.title}
                      onChange={(e) =>
                        setEditingPlan({
                          ...editingPlan,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="Plan Title"
                    />

                    <input
                      value={editingPlan.price}
                      onChange={(e) =>
                        setEditingPlan({
                          ...editingPlan,
                          price: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="Price"
                    />

                    <input
                      value={editingPlan.duration}
                      onChange={(e) =>
                        setEditingPlan({
                          ...editingPlan,
                          duration: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="Duration"
                    />

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={updatePlan}
                        className="flex-1 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingPlan(null)}
                        className="flex-1 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                        {plan.title}
                      </h4>
                      <span className="text-sm font-semibold text-green-600">
                        ₹{plan.price}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                      Duration:{" "}
                      <span className="font-medium text-gray-700">
                        {plan.duration}
                      </span>
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditingPlan(plan)}
                        className="flex-1 py-2 rounded-lg bg-yellow-400 font-semibold hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePlan(plan._id)}
                        className="flex-1 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerDashboard;
