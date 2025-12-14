import { useEffect, useState } from "react";
import api from "../api/axios";

function TrainerProfileSelf() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/users/me/profile").then((res) => setData(res.data));
  }, []);

  /* Loading State */
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse space-y-4 w-full max-w-3xl px-6">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="grid gap-4">
            <div className="h-28 bg-gray-200 rounded"></div>
            <div className="h-28 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const { trainer, plans } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
              {trainer.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {trainer.name}
              </h2>
              <p className="text-gray-500">{trainer.email}</p>
              <span className="inline-block mt-1 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                {trainer.role}
              </span>
            </div>
          </div>
        </div>

        {/* Plans Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              My Fitness Plans
            </h3>
            <span className="text-sm text-gray-500">
              {plans.length} plan{plans.length !== 1 && "s"}
            </span>
          </div>

          {plans.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg font-medium">No plans created yet</p>
              <p className="text-sm mt-1">
                Start creating fitness plans to grow your audience 💪
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  className="group border rounded-xl p-5 transition transform hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br from-white to-gray-50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                      {plan.title}
                    </h4>
                    <span className="text-sm font-semibold text-green-600">
                      ₹{plan.price}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mb-2">
                    Duration: <span className="font-medium">{plan.duration}</span>
                  </p>

                  <p className="text-gray-600 text-sm line-clamp-3">
                    {plan.description}
                  </p>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrainerProfileSelf;
