import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  // onClick handlers
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const updateCount = () => {
    setCount(Number(inputValue));
  };

  return (
    <div >
      <h2>Simple Counter</h2>
      <p>Current count: {count}</p>
      
      <div>
        <button onClick={decrement}>Decrement</button>
        <button onClick={increment}>Increment</button>
      </div>
      
      <div >
        <input 
          type="number" 
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={updateCount}>Update Count</button>
      </div>

      <p>{count > 10 ? 'Greater than 10' : 'Less than or equal to 10'}</p>
    </div>
  );
}

export default Counter;
