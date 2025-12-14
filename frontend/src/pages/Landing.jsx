import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import PlanCard from "../components/PlanCard";

function Landing() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    api.get("/plans").then((res) => setPlans(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Hero Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome to <span className="text-indigo-600">FitPlanHub</span>
            </h1>
            <p className="text-gray-600 max-w-xl">
              Discover expert-designed fitness plans from certified trainers
              and start your journey toward a healthier, stronger you.
            </p>


          </div>

          {/* Decorative Card */}
         
        </section>

        {/* Plans Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              Available Fitness Plans
            </h2>
            <span className="text-sm text-gray-500">
              {plans.length} plan{plans.length !== 1 && "s"}
            </span>
          </div>

          {plans.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-10 text-center text predictor-gray-500">
              <p className="text-lg font-medium">No plans available yet</p>
              <p className="text-sm mt-1">
                Trainers will be adding new plans soon 💪
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  className="transform transition hover:-translate-y-1"
                >
                  <PlanCard plan={plan} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Landing;
