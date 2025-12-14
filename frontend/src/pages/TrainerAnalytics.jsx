import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, ResponsiveContainer
} from "recharts";

function TrainerAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/analytics/trainer").then((res) => setData(res.data));
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Loading analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Trainer Analytics
          </h2>
          <p className="text-gray-500 mt-1">
            Insights into your plans, subscribers, and revenue
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <p className="text-sm text-gray-500">Total Plans</p>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              {data.totalPlans}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <p className="text-sm text-gray-500">Total Subscribers</p>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              {data.totalSubscribers}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              ₹{data.totalRevenue}
            </p>
          </div>
        </div>

        {/* Subscribers Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Subscribers per Plan
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.plans}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="subscribers" fill="#6366F1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Revenue per Plan
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.plans}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Plan Details
          </h3>

          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-indigo-50 text-left">
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Plan
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Subscribers
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {data.plans.map((plan) => (
                <tr
                  key={plan.planId}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{plan.title}</td>
                  <td className="px-4 py-3">₹{plan.price}</td>
                  <td className="px-4 py-3">{plan.subscribers}</td>
                  <td className="px-4 py-3 font-medium text-green-600">
                    ₹{plan.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default TrainerAnalytics;
