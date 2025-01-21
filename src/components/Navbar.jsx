import React, { useState } from "react";
import { Link, useNavigate , useLocation} from "react-router-dom";
import { BookOpen, Layout, Menu, TestTube2, Trophy, User } from "lucide-react";
import { useSelector, useDispatch} from "react-redux";
import { logout } from "../store/authSlice.js";

function Navbar() {
  const user = useSelector((state) => state.auth.user) || false;
  const admin = useSelector((state) => state.auth.admin) || false;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/logout");
  };

  const isAdminPage = location.pathname === "/admin-dashboard"; 

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">PlacementCrack</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8 items-center">
            <NavLink to="/" icon={<Layout className="h-5 w-5" />} text="Dashboard" />
            <NavLink to="/questions" icon={<BookOpen className="h-5 w-5" />} text="Questions" />
            <NavLink to="/mock-tests" icon={<TestTube2 className="h-5 w-5" />} text="Mock Tests" />
            <NavLink to="/leaderboard" icon={<Trophy className="h-5 w-5" />} text="Leaderboard" />
          </div>

          {/* User Authentication Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!user && !admin ? (
              !isAdminPage && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Signup
                </Link>
              </>
              )
            ) : (
              isAdminPage && (
              <>
                <Link
                  to="/userprofile"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  <User className="h-5 w-5" />
                  <span className="ml-2">Profile</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} bg-gray-100 rounded-lg shadow-md p-4 space-y-4`}
      >
        <MobileNavLink to="/" text="Home" onClick={toggleMobileMenu} />
        <MobileNavLink to="/questions" text="Questions" onClick={toggleMobileMenu} />
        <MobileNavLink to="/mock-tests" text="Mock Tests" onClick={toggleMobileMenu} />
        <MobileNavLink to="/leaderboard" text="Leaderboard" onClick={toggleMobileMenu} />
        {!user ? (
          <div className="space-y-2">
            <MobileNavLink to="/login" text="Login" onClick={toggleMobileMenu} />
            <MobileNavLink to="/signup" text="Signup" onClick={toggleMobileMenu} />
            <MobileNavLink to="/admin" text="Admin" onClick={toggleMobileMenu} />
          </div>
        ) : (
          <button
            onClick={() => {
              handleLogout();
              toggleMobileMenu();
            }}
            className="block w-full text-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

// NavLink Component for Desktop Navigation
function NavLink({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:border-gray-300"
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Link>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({ to, text, onClick }) {
  return (
    <Link
      to={to}
      className="block text-gray-700 hover:text-blue-600 px-4 py-2"
      onClick={onClick}
    >
      {text}
    </Link>
  );
}

export default Navbar;
