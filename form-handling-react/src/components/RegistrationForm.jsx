import React, { useState } from 'react';

/**
 * A controlled component for a user registration form.
 * This form manages its state using separate useState hooks for each input field.
 * This is a less common but still valid pattern for controlled components.
 */
const RegistrationForm = () => {
  // Use separate useState hooks for each input field.
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for storing validation errors.
  const [errors, setErrors] = useState({});

  /**
   * Dedicated handler for the username input.
   * @param {object} e - The event object from the input.
   */
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  /**
   * Dedicated handler for the email input.
   * @param {object} e - The event object from the input.
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  /**
   * Dedicated handler for the password input.
   * @param {object} e - The event object from the input.
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * Validates the form data and returns an object of errors.
   */
  const validate = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = 'Username is required';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  /**
   * Handles the form submission.
   * Prevents default form behavior and performs validation before processing.
   * @param {object} e - The event object from the form submission.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    // If there are no validation errors, proceed with submission logic.
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form data submitted:', { username, email, password });
      // In a real application, you would send this data to an API here.
      alert('Registration Successful!');
      // Clear the form after successful submission.
      setUsername('');
      setEmail('');
      setPassword('');
    } else {
      console.log('Validation errors:', validationErrors);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Controlled Component Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            // The value is bound to the separate 'username' state variable.
            value={username}
            onChange={handleUsernameChange}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
          {errors.username && <p style={{ color: 'red', fontSize: '12px' }}>{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            // The value is bound to the separate 'email' state variable.
            value={email}
            onChange={handleEmailChange}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            // The value is bound to the separate 'password' state variable.
            value={password}
            onChange={handlePasswordChange}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
          {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password}</p>}
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;