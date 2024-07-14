// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PracticePage from './pages/PracticePage';
import PersonalInfo from './pages/PersonalInfo';
import Navigation from './pages/Navigation'; // Import the Navigation component

function App() {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

  const handleLoginSuccess = (loggedInUserName) => {
    setUserName(loggedInUserName);
    localStorage.setItem('userName', loggedInUserName);
  };

  return (
    <Router>
      <div>
        <Navigation /> {/* Include the Navigation component */}
        <Routes>
          <Route path="/practice" element={<PracticePage userName={userName} onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/personal-info" element={<PersonalInfo />} />
          <Route path="/" element={<Navigate to="/practice" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
