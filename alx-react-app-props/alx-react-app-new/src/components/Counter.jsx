import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      textAlign: 'center',
      margin: '20px',
      padding: '20px',
      border: '2px solid #3498db',
      borderRadius: '10px',
      backgroundColor: '#f8f9fa'
    }}>
      <h2 style={{ color: '#2c3e50' }}>Counter Application</h2>
      <p style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#e74c3c',
        margin: '20px 0'
      }}>
        Current Count: {count}
      </p>
      <div>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            backgroundColor: '#27ae60',
            color: 'white',
            padding: '10px 20px',
            margin: '5px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Increment
        </button>
        <button 
          onClick={() => setCount(count - 1)}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            padding: '10px 20px',
            margin: '5px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Decrement
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            padding: '10px 20px',
            margin: '5px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;