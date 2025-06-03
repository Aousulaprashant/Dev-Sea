import React from "react";
import devToolsList from "../../utils/ToolsList";
import Header from "../Header";
import "./DevTool.css"; // For styling

const DevTool = () => {
  return (
    <div className="devtool-page">
      <div className="devtool-container">
        <h1>Best Developer Tools & Resources</h1>
        <div className="devtool-grid">
          {devToolsList.map((tool, index) => (
            <a
              key={index}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="devtool-card"
            >
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevTool;
