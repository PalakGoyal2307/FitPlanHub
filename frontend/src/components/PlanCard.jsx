import api from "../api/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlanCard({ plan }) {
  const role = localStorage.getItem("role");
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (role === "user") {
      api.get("/follow/my").then((res) => {
        const followed = res.data.some(
          (f) => f.trainer._id === plan.trainer._id
        );
        setIsFollowing(followed);
      });
    }
  }, [plan.trainer._id, role]);

  const followTrainer = async () => {
    await api.post(`/follow/${plan.trainer._id}`);
    setIsFollowing(true);
  };

  const unfollowTrainer = async () => {
    await api.delete(`/follow/${plan.trainer._id}`);
    setIsFollowing(false);
  };

  return (
    <div className="border rounded p-4 mb-4 shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{plan.title}</h3>
      <p>
        Trainer:{" "}
        <Link to={`/trainer/${plan.trainer._id}`} className="text-blue-500 hover:underline">
          {plan.trainer.name}
        </Link>
      </p>
      <p className="font-bold">Price: ₹{plan.price}</p>

      {role === "user" && (
        <div className="mt-2">
          {isFollowing ? (
            <button
              onClick={unfollowTrainer}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Unfollow Trainer
            </button>
          ) : (
            <button
              onClick={followTrainer}
              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Follow Trainer
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default PlanCard;
