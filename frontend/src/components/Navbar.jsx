import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-0 py-3 flex flex-wrap items-center justify-between gap-3">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:opacity-90 transition"
        >
          FitPlanHub
        </Link>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
          {!role && (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}

          {role === "user" && (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/feed">My Feed</NavLink>
              <NavLink to="/following">Following</NavLink>
            </>
          )}

          {role === "trainer" && (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/trainer/profile">Profile</NavLink>
              <NavLink to="/trainer">Dashboard</NavLink>
            </>
          )}

          {role && (
            <button
              onClick={logout}
              className="ml-2 px-4 py-1.5 rounded-lg bg-red-500 font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

/* Reusable styled link */
function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="px-3 py-1.5 rounded-lg hover:bg-white/20 transition"
    >
      {children}
    </Link>
  );
}

export default Navbar;
