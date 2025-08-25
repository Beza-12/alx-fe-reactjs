import React from 'react';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';
import Counter from './components/Counter';  
function App() {
  return (
    <div className="App" style={{ 
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#f8f9fa'
    }}>
      <Header />
      
      <UserProfile 
        name="John Doe" 
        age={28} 
        bio="Travel enthusiast and photography lover. Exploring the world one city at a time."
      />
      
      <UserProfile 
        name="Jane Smith" 
        age={32} 
        bio="Food blogger and cultural explorer. Documenting culinary adventures across continents."
      />
      
      <MainContent />
      <Counter />
      <Footer />
    </div>
  );
}

export default App;