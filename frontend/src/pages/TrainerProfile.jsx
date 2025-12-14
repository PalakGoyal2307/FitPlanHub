import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function TrainerProfile() {
  const { trainerId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/users/trainer/${trainerId}`).then((res) => setData(res.data));
  }, [trainerId]);

  const follow = async () => {
    await api.post(`/follow/${trainerId}`);
    setData({ ...data, isFollowing: true });
  };

  const unfollow = async () => {
    await api.delete(`/follow/${trainerId}`);
    setData({ ...data, isFollowing: false });
  };

  const subscribe = async (planId) => {
    await api.post(`/subscriptions/${planId}`);
    setData({
      ...data,
      plans: data.plans.map((p) =>
        p._id === planId ? { ...p, isSubscribed: true } : p
      )
    });
  };

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{data.trainer.name}</h2>
      {data.trainer.email && <p>Email: {data.trainer.email}</p>}
      {data.isFollowing ? (
        <button
          onClick={unfollow}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 my-2"
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={follow}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 my-2"
        >
          Follow
        </button>
      )}
      <hr className="my-4" />

      <h3 className="text-xl font-semibold mb-2">Plans</h3>
      <div className="grid gap-4">
        {data.plans.map((plan) => (
          <div key={plan._id} className="border p-4 rounded shadow hover:shadow-lg">
            <h4 className="font-semibold">{plan.title}</h4>
            <p>Price: ₹{plan.price}</p>
            {plan.isSubscribed ? (
              <>
                <p>{plan.description}</p>
                <p>Duration: {plan.duration}</p>
                <button disabled className="bg-gray-300 px-3 py-1 rounded">Subscribed ✅</button>
              </>
            ) : (
              <button
                onClick={() => subscribe(plan._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Subscribe
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainerProfile;
