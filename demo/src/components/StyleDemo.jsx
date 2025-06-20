import React from 'react';
import '../styles/StyleDemo.css';
import styles from '../styles/StyleDemo.module.css';

function StyleDemo() {
  const inlineStyle = {
    backgroundColor: 'lightpink',
    padding: '10px',
    margin: '10px',
    borderRadius: '5px'
  };

  return (
    <div>
      <h2>React Styling Approaches</h2>

      {/* using inline styles */}
      <div style={inlineStyle}>
        <h3>1. Inline Styles</h3>
        <p>Styles defined as JavaScript objects</p>
      </div>

      {/* using .css file */}
      <div className="css-box">
        <h3>2. Regular CSS</h3>
        <p>Styles from imported CSS file</p>
      </div>

      {/* using CSS Modules */}
      <div className={styles.moduleBox}>
        <h3>3. CSS Modules</h3>
        <p>Scoped styles from CSS module</p>
      </div>
    </div>
  );
}

export default StyleDemo;
