import React from 'react';

function ProjectStructure() {
  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h2>React Project Structure</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Folder Organization</h3>
        <ul style={{ lineHeight: '1.6' }}>
          <li>
            <strong>src/components/</strong> - Reusable UI components
            <ul>
              <li>Each component should be in its own file</li>
              <li>Example: Button.jsx, Navbar.jsx, Card.jsx</li>
            </ul>
          </li>
          <li>
            <strong>src/pages/</strong> - Page components that use smaller components
            <ul>
              <li>Example: Home.jsx, About.jsx, Contact.jsx</li>
            </ul>
          </li>
          <li>
            <strong>src/styles/</strong> - CSS files for styling components
            <ul>
              <li>Can use .css, .scss, or CSS modules (.module.css)</li>
            </ul>
          </li>
          <li>
            <strong>src/assets/</strong> - Static files like images, fonts, etc.
          </li>
          <li>
            <strong>src/utils/</strong> - Helper functions and utilities
          </li>
        </ul>
      </div>
      
      <div>
        <h3>Development Tools</h3>
        <ul style={{ lineHeight: '1.6' }}>
          <li>
            <strong>React Developer Tools</strong>
            <ul>
              <li>Browser extension for Chrome or Firefox</li>
              <li>Inspect component hierarchy and props</li>
              <li>Monitor state and re-renders</li>
              <li>Find performance bottlenecks</li>
            </ul>
          </li>
          <li>
            <strong>ESLint</strong> - Code linting for catching errors
          </li>
          <li>
            <strong>Prettier</strong> - Code formatting for consistency
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProjectStructure; 