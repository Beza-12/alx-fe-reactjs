function Footer() {
  return (
    <footer style={{
      backgroundColor: '#34495e',
      color: 'white',
      padding: '2rem',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <p style={{ margin: '0 0 1rem 0' }}>
          © 2024 Company Name. All rights reserved.
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Careers</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;