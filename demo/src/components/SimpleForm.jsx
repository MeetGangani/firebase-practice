import { useState, useRef } from 'react';

function SimpleForm() {
  // State for controlled input
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  
  // Ref for uncontrolled input
  const emailRef = useRef(null);
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Handler for controlled form submission
  const handleControlledSubmit = (e) => {
    e.preventDefault();
    setSubmittedName(name);
  };
  
  // Handler for uncontrolled form submission
  const handleUncontrolledSubmit = (e) => {
    e.preventDefault();
    setSubmittedEmail(emailRef.current.value);
  };

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h2>React Forms</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3>Controlled Input</h3>
        <p>React manages the form data through state</p>
        
        <form onSubmit={handleControlledSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: '5px', width: '200px' }}
            />
          </div>
          <button 
            type="submit" 
            style={{ backgroundColor: '#4CAF50', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px' }}
          >
            Submit
          </button>
        </form>
        
        {submittedName && <p>Submitted name: {submittedName}</p>}
      </div>
      
      <div>
        <h3>Uncontrolled Input</h3>
        <p>DOM handles the form data, accessed via refs</p>
        
        <form onSubmit={handleUncontrolledSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              defaultValue=""
              style={{ padding: '5px', width: '200px' }}
            />
          </div>
          <button 
            type="submit" 
            style={{ backgroundColor: '#008CBA', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px' }}
          >
            Submit
          </button>
        </form>
        
        {submittedEmail && <p>Submitted email: {submittedEmail}</p>}
      </div>
    </div>
  );
}

export default SimpleForm; 