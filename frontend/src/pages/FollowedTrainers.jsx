import { useEffect, useState } from "react";
import api from "../api/axios";

function FollowedTrainers() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    api.get("/follow/my").then((res) => setTrainers(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Trainers You Follow
          </h2>
          <p className="text-gray-500 mt-1">
            Stay updated with plans from your favorite trainers
          </p>
        </div>

        {/* Empty State */}
        {trainers.length === 0 && (
          <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
            <p className="text-lg font-medium">
              You are not following any trainers yet
            </p>
            <p className="text-sm mt-1">
              Follow trainers to see their plans in your feed 💪
            </p>
          </div>
        )}

        {/* Trainers Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {trainers.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-2xl shadow-md p-6 transition transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                  {item.trainer.name.charAt(0)}
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                    {item.trainer.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.trainer.email}
                  </p>
                </div>
              </div>

             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FollowedTrainers;
