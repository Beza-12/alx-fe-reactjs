
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserProfile from './components/UserProfile';

function App() {
 

  return (
    <>
      <div>
 <UserProfile />
      </div>

      {/* Render the UserProfile component below the existing content */}
     
    </>
  )
}

export default App
