import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sideBar.css";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-outerMain">
      {/* Hamburger Button - visible only on mobile */}
      <button className="menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav>
          <ul>
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>
                <span>🏠</span> Home
              </Link>
            </li>
            <li>
              <Link to="/Tags" onClick={() => setIsOpen(false)}>
                <span>🏷️</span> Tags
              </Link>
            </li>
            <li>
              <Link to="/saved" onClick={() => setIsOpen(false)}>
                <span>🔖</span> Saves
              </Link>
            </li>
            <li>
              <Link to="/DevTools" onClick={() => setIsOpen(false)}>
                <span>🪛</span> Dev Tools
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-section">
          <h4>COLLECTIVES</h4>
          <p>
            <Link>Explore all Collectives</Link>
          </p>
        </div>

        <div className="sidebar-section">
          <h4>TEAMS</h4>
          <p>
            <Link>Create free Team</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
