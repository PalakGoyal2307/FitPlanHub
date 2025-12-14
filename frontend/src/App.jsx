import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import TrainerDashboard from "./pages/TrainerDashboard";
import CreatePlan from "./pages/CreatePlan";
import UserFeed from "./pages/UserFeed";
import Navbar from "./components/Navbar";
import TrainerAnalytics from "./pages/TrainerAnalytics";
import PersonalizedFeed from "./pages/PersonalizedFeed";
import FollowedTrainers from "./pages/FollowedTrainers";
import TrainerProfile from "./pages/TrainerProfile";
import TrainerProfileSelf from "./pages/TrainerProfileSelf";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto px-4 mt-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trainer" element={<TrainerDashboard />} />
          <Route path="/create-plan" element={<CreatePlan />} />
          <Route path="/analytics" element={<TrainerAnalytics />} />
          <Route path="/feed" element={<PersonalizedFeed />} />
          <Route path="/following" element={<FollowedTrainers />} />
          <Route path="/trainer/:trainerId" element={<TrainerProfile />} />
          <Route path="/trainer/profile" element={<TrainerProfileSelf />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
