import React, { useState, useRef } from "react";

export default function ControlledVsUncontrolledForm() {
  // 🔹 Controlled Input State
  const [controlledName, setControlledName] = useState("");

  // 🔹 Uncontrolled Input Reference
  const uncontrolledRef = useRef();

  // 🔹 Controlled Form: Handler for form submission
  const handleControlledSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    alert("Controlled Form Submitted with value: " + controlledName);
  };

  // 🔹 Uncontrolled Form: Handler for button click
  const handleUncontrolledSubmit = () => {
    alert("Uncontrolled Input Value: " + uncontrolledRef.current.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px", padding: "20px" }}>
      
      {/* ✅ Controlled Input Section */}
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
        <h2>Controlled Input Form</h2>

        {/* 
          A basic form with:
          - a controlled input
          - a submit button
          - an onSubmit handler
        */}
        <form onSubmit={handleControlledSubmit}>
          <label>
            Enter Name:
            <input
              type="text"
              value={controlledName} // Input is tied to React state
              onChange={(e) => setControlledName(e.target.value)} // Updates state on change
              placeholder="Controlled Input"
              style={{ marginLeft: "10px" }}
            />
          </label>
          <br /><br />
          <button type="submit">Submit Controlled</button>
        </form>

        {/* Shows real-time input value from state */}
        <p>Current State Value: {controlledName}</p>
      </div>

      {/* 🟡 Uncontrolled Input Section */}
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
        <h2>Uncontrolled Input</h2>

        {/* 
          This input is not tied to React state.
          We use a ref to access its value when needed.
        */}
        <label>
          Enter Name:
          <input
            type="text"
            ref={uncontrolledRef}
            placeholder="Uncontrolled Input"
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br /><br />

        {/* Button triggers handler that accesses the ref value */}
        <button onClick={handleUncontrolledSubmit}>Show Uncontrolled Value</button>
      </div>
    </div>
  );
}
