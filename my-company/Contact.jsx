import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '600px', 
      margin: '0 auto',
      minHeight: '60vh'
    }}>
      <h1 style={{ 
        color: '#2c3e50', 
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        Contact Us
      </h1>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#f8f9fa',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            color: '#2c3e50'
          }}>
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '2px solid #bdc3c7',
              borderRadius: '5px',
              fontSize: '1rem'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            color: '#2c3e50'
          }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '2px solid #bdc3c7',
              borderRadius: '5px',
              fontSize: '1rem'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            color: '#2c3e50'
          }}>
            Message
          </label>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '2px solid #bdc3c7',
              borderRadius: '5px',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>
        
        <button type="submit" style={{
          backgroundColor: '#3498db',
          color: 'white',
          padding: '12px 30px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1.1rem',
          cursor: 'pointer',
          width: '100%'
        }}>
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;