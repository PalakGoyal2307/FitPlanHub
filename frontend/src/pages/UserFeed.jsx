import { useEffect, useState } from "react";
import api from "../api/axios";

function UserFeed() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    api.get("/follow/my").then((res) => setTrainers(res.data));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Trainers You Follow</h2>
      {trainers.length === 0 && <p>You are not following any trainers.</p>}
      <div className="grid gap-4">
        {trainers.map((item) => (
          <div key={item._id} className="border p-4 rounded shadow hover:shadow-lg">
            <h3 className="text-lg font-semibold">{item.trainer.name}</h3>
            <p>{item.trainer.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserFeed;
