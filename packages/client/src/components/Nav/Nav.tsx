import "./Nav.css";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Nav() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  // Logout function from AuthContext
  const { isAuthenticated, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  // Render
  return (
    <nav className="Nav">
      <Link to="/home" className="title">
        Home
      </Link>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink to="Link2">Task</NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <NavLink to="/dogs">Dogs</NavLink>
          </li>
        )}
        <li>
          {/* change button based on state */}
          {isAuthenticated ? (
            <button id="navButton" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
