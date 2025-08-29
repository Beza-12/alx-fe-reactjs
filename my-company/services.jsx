function Services() {
  const services = [
    {
      title: "Technology Consulting",
      description: "Expert advice on implementing the right technology solutions for your business needs.",
      icon: "💻"
    },
    {
      title: "Market Analysis",
      description: "Comprehensive market research and analysis to help you make informed decisions.",
      icon: "📊"
    },
    {
      title: "Product Development",
      description: "End-to-end product development services from concept to deployment.",
      icon: "🚀"
    },
    {
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns to boost your online presence.",
      icon: "📱"
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services.",
      icon: "☁️"
    },
    {
      title: "Data Analytics",
      description: "Turn your data into actionable insights with our analytics expertise.",
      icon: "📈"
    }
  ];

  return (
    <div style={{ 
      padding: '40px', 
      backgroundColor: '#ecf0f1',
      minHeight: '60vh'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#2c3e50', 
        marginBottom: '40px' 
      }}>
        Our Services
      </h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {services.map((service, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
              {service.icon}
            </div>
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>
              {service.title}
            </h3>
            <p style={{ color: '#7f8c8d', lineHeight: '1.5' }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;