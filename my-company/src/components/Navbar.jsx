import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '1rem 2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          Company Name
        </Link>
        
        <div style={{
          display: 'flex',
          gap: '2rem'
        }}>
          <Link 
            to="/" 
            style={{ 
              color: location.pathname === '/' ? '#3498db' : 'white',
              textDecoration: 'none',
              fontWeight: location.pathname === '/' ? 'bold' : 'normal',
              transition: 'color 0.3s ease'
            }}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            style={{ 
              color: location.pathname === '/about' ? '#3498db' : 'white',
              textDecoration: 'none',
              fontWeight: location.pathname === '/about' ? 'bold' : 'normal',
              transition: 'color 0.3s ease'
            }}
          >
            About
          </Link>
          <Link 
            to="/services" 
            style={{ 
              color: location.pathname === '/services' ? '#3498db' : 'white',
              textDecoration: 'none',
              fontWeight: location.pathname === '/services' ? 'bold' : 'normal',
              transition: 'color 0.3s ease'
            }}
          >
            Services
          </Link>
          <Link 
            to="/contact" 
            style={{ 
              color: location.pathname === '/contact' ? '#3498db' : 'white',
              textDecoration: 'none',
              fontWeight: location.pathname === '/contact' ? 'bold' : 'normal',
              transition: 'color 0.3s ease'
            }}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;